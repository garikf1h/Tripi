from flask import Flask, render_template, request, redirect, send_from_directory
from flask_mysqldb import MySQL
import requests
import geopy.distance
from enum import Enum
import datetime
from datetime import date

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

google_api_key = 'AIzaSyAesDybIrVwbCEsSm0rGbwlB06zSIdxpgc'


class PlaceType(Enum):
    Accommodation = 1
    Restaurant = 2

def getSeason():
    #summer - 6,7,8 (2)
    #autumn - 9,10,11 (3)
    #winter - 12,1,2 (0/4)
    #sprng - 3,4,5 (1)
    currMonth = date.today().month
    if 3 <= currMonth <= 5:
        return '%אביב%'
    elif 6<= currMonth <=8:
        return '%קיץ%'
    elif 9<= currMonth <=11:
        return '%סתיו%'
    else:
        return '%חורף%'

def activity_num_to_string(num_value):
    return {
        '1': 'קל',
        '2': 'קל-בינוני',
        '3':'בינוני',
        '4':'קשה'
    }[num_value]


def get_recommendation(input_parameters):
    region = input_parameters['region'] #hebrew
    accesability = input_parameters['access']
    water = input_parameters['with_water']
    length = input_parameters['length'] #0/1/2
    children = input_parameters['child']
    activity_level_string = activity_num_to_string(str(input_parameters['level']))
    price_range = input_parameters['price']
    restaurant_type = input_parameters['rest']
    full_trip_options =[]
    trips = get_trips_with_score(region,accesability,water,length,children,activity_level_string)
    print(trips)
    for trip in trips['data']:
        trip_score = trip['total_score']/2
        params = {'coordinates':{'x':trip['Starting_point_x'], 'y':trip['Starting_point_y']}}
        rest_options = get_restaurants(params, restaurant_type)
        rest_options_with_score = []
        for rest in rest_options:
            rest_info = {"score":get_score(rest,price_range,PlaceType.Restaurant),"restaurant":rest}
            rest_options_with_score.append(rest_info)
        rest_options_with_score.sort(key=lambda x: x["score"],reverse = True) #need to convert to int?

        accom_options_with_score = []
        if length == '2':
            accom_options = get_accom(params)
            for accom in accom_options:
                accom_info = {"score":get_score(accom,price_range,PlaceType.Accommodation),"accom":accom}
                accom_options_with_score.append(accom_info)
            accom_options_with_score.sort(key=lambda x:x["score"],reverse=True) #nned to convert to int?
        chosen_rest=rest_options_with_score[0] if len(rest_options_with_score)>0 else {"score":0,"restaurant":{}}
        chosen_accom=accom_options_with_score[0] if len(accom_options_with_score)>0 else {"score":0,"accom":{}}

        trip_components = {"trip":trip, "rest":chosen_rest["restaurant"],"accom":chosen_accom["accom"],
                           "score": chosen_rest["score"]+chosen_accom["score"]+trip_score}
        full_trip_options.append(trip_components)
    full_trip_options.sort(key=lambda x: x["score"], reverse=True) #need to convert to string?
    return full_trip_options[:3]


def get_trips(free_text,region,accesability,water,length,children ='לא',activity_level=''):
    cur = mysql.connection.cursor()
    free_text_for_search = "%" + free_text + "%"
    season = getSeason()
    query = ("select name, shortDescription, Product_url,cast(Starting_point_x as char(10)) as Starting_point_x,cast(Starting_point_y as char(10)) as Starting_point_y, case when Best_season ='בכל ימות השנה' or Best_season like %s then 1 else 0 end as fitting_season FROM TRACKS"
             " where (%s = 'לא' or TRACKS.Accessibility in ('כן','נגישות חלקית'))"
             " and (%s ='' or Name like %s or ShortDescription like %s or FullDescription like %s)"
             " and (%s = TRACKS.Region or %s = 'הכל' or %s = '')"
             " and (%s='לא' or TRACKS.Bathing_Waters='כן')"
             " and (%s = 'הכל' or (%s = '0' and cast(Trail_Duration as unsigned) <5)"
             " or (%s = '1' and cast(Trail_Duration as unsigned) <9)"
             " or (%s = '2'))"
             " and (%s='לא' or TRACKS.Suitable_for_Children='כן')"
             " and (%s = '' or Difficulty_Level is null or Difficulty_Level = %s )"
             "order by fitting_season desc"
             )
    cur.execute(query,
                [season,
                accesability ,
                free_text, free_text_for_search, free_text_for_search, free_text_for_search,
                 region, region, region,
                 water,
                 length, length, length, length,
                    children,
                    activity_level,activity_level
                     ])
    a = cur.fetchall()
    print(a)
    data = {"data": a}
    return data


def get_trips_with_score(region,accesability,water,length,children ='לא',activity_level=''):
    cur = mysql.connection.cursor()
    season = getSeason()
    query = ("select a.*, fitting_season_score + access_score + region_score + water_score+length_score+children_score+difficulty_score as total_score from "
             "(select name, shortDescription, Product_url,cast(Starting_point_x as char(10)) as Starting_point_x,cast(Starting_point_y as char(10)) as Starting_point_y,"
             "case when Best_season ='בכל ימות השנה' or Best_season like %s then 5 else 0 end as fitting_season_score,"
             "case when (%s = 'לא' or TRACKS.Accessibility in ('כן')) then 15 "
             "when  TRACKS.Accessibility in ('נגישות חלקית') then 10 else 0 end access_score,"
             "case when (%s = TRACKS.Region or %s = 'הכל' or %s = '') then 40 else 0 end region_score,"
             "case when (%s='לא' or TRACKS.Bathing_Waters='כן') then 10 else 0 end water_score,"
             "case when (%s in ('הכל','2') or cast(Trail_Duration as unsigned) <9) then 10 else 0 end length_score,"
             "case when (%s='לא' or TRACKS.Suitable_for_Children='כן') then 10 else 0 end children_score,"
             "case when (%s = '' or Difficulty_Level is null or Difficulty_Level = %s ) then 10 "
             "when (%s = 'קל-בינוני' and Difficulty_Level in ('קל')) or "
             "(%s = 'בינוני' and Difficulty_Level in ('קל','קל-בינוני')) or "
             "(%s = 'קשה' and Difficulty_Level in ('קל','קל-בינוני','בינוני')) then 5 else 0 end difficulty_score "
             "FROM TRACKS)"
             "as a  order by total_score desc limit 5"
             )
    cur.execute(query,
                [season,
                 accesability,
                 region, region, region,
                 water,
                 length,
                 children,
                 activity_level, activity_level, activity_level, activity_level, activity_level
                 ])
    a = cur.fetchall()
    print(a)
    data = {"data": a}
    return data


def get_restaurants(params,rest_type,radius = '10000'):
    cor_x = params['coordinates']['x']
    cor_y = params['coordinates']['y']
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=restaurant&keyword=" + rest_type+"&key=" + google_api_key
    res = requests.get(get_url)
    parsed_list = res.json()['results']
    for item in parsed_list:
        item.update({"keyword":True,"Distance":geopy.distance.distance((cor_y,cor_x),(item['geometry']['location']['lat'],item['geometry']['location']['lng'])).km})
    if (len(res.json()['results']) < 5 and rest_type != ''):
        get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=restaurant&key=" + google_api_key
        res_wider = requests.get(get_url)
        parsed_list_wider = res_wider.json()['results']
        for item in parsed_list_wider:
            item.update({"keyword": False, "Distance": geopy.distance.distance((cor_y, cor_x), (item['geometry']['location']['lat'], item['geometry']['location']['lng'])).km})
        parsed_list += parsed_list_wider
    return parsed_list


def get_score(place, price_range,place_type):
    rating_score = place.get('rating') if place.get('rating') is not None else 0
    price_score = 5 if place.get('price_level') is not None and place.get('price_level') <= int(price_range) else 0
    keyword_score = 10 if place_type == PlaceType.Restaurant and place.get('keyword') is True else 0
    distance = place.get('Distance')
    if distance < 2:
        distance_score = 10
    elif distance < 5:
        distance_score = 5
    else:
        distance_score = 0
    return rating_score + price_score + keyword_score + distance_score


def get_accom(params,radius = '10000'):
    cor_x = params['coordinates']['x']
    cor_y = params['coordinates']['y']
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=lodging&key=" + google_api_key
    res = requests.get(get_url)
    parsed_list = res.json()['results']
    for item in parsed_list:
        item.update({"Distance":geopy.distance.distance((cor_y,cor_x),(item['geometry']['location']['lat'],item['geometry']['location']['lng'])).km})
    return parsed_list
