from flask import Flask, render_template, request, redirect, send_from_directory
from flask_mysqldb import MySQL
import requests

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

google_api_key = 'AIzaSyAesDybIrVwbCEsSm0rGbwlB06zSIdxpgc'

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
    activity_level = activity_num_to_string(str(input_parameters['level']))
    price_range = input_parameters['price']
    restaurant_type = input_parameters['rest']
    full_trip_options =[]
    trips = get_trips('',region,accesability,water,length,children,activity_level)
    for trip in trips['data']:
        params={'coordinates':{'x':trip['Starting_point_x'], 'y':trip['Starting_point_y']}}
        rest_options = get_restaurants(params,restaurant_type)
        rest_options_with_score = []
        for rest in rest_options:
            rest_info = {"score":get_score(rest,price_range),"restaurant":rest}
            rest_options_with_score.append(rest_info)
        rest_options_with_score.sort(key = lambda x:x["score"],reverse = True) #need to convert to int?

        accom_options_with_score = []
        if length == '2':
            accom_options = get_accom(params)
            for accom in accom_options:
                accom_info = {"score":get_score(accom,price_range),"accom":accom}
                accom_options_with_score.append(accom_info)
            accom_options_with_score.sort(key=lambda x:x["score"],reverse=True) #nned to convert to int?
        chosen_rest=rest_options_with_score[0] if len(rest_options_with_score)>0 else {"score":0,"restaurant":{}}
        chosen_accom=accom_options_with_score[0] if len(accom_options_with_score)>0 else {"score":0,"accom":{}}

        trip_components = {"trip":trip,"rest":chosen_rest["restaurant"],"accom":chosen_accom["accom"],
                           "score":chosen_rest["score"]+chosen_accom["score"]}
        full_trip_options.append(trip_components)
    full_trip_options.sort(key=lambda x:x["score"], reverse = True) #need to convert to string?
    return full_trip_options[:3]

def get_trips(free_text,region,accesability,water,length,children ='לא',activity_level=''):
    cur = mysql.connection.cursor()
    #     ## change to real name#
    free_text_for_search = "%" + free_text + "%"
    season = '%סתיו%'
    query = ("select name, shortDescription, Product_url,cast(Starting_point_x as char(10)) as Starting_point_x,cast(Starting_point_y as char(10)) as Starting_point_y, case when Best_season ='בכל ימות השנה' or Best_season like %s then 1 else 0 end as fitting_season FROM TRACKS"
             " where (%s = 'לא' or TRACKS.Accessibility in ('כן','נגישות חלקית'))"
             " and (%s ='' or Name like %s or ShortDescription like %s or FullDescription like %s)"
             " and (%s = TRACKS.Region or %s = 'הכל' or %s = '')"
             " and (%s='לא' or TRACKS.Bathing_Waters='כן')"
             " and (%s = 'הכל' or (%s = '0' and cast(Trail_Duration as unsigned) <5)"
             " or (%s = '1' and cast(Trail_Duration as unsigned) >= 5 and cast(Trail_Duration as unsigned) <9)"
             " or (%s = '2' and cast(Trail_Duration as unsigned) >= 9))"
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


def get_restaurants(params,rest_type,radius = '1500'):
    cor_x = params['coordinates']['x']
    cor_y = params['coordinates']['y']
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=restaurant&keyword=" + rest_type+"&key=" + google_api_key
    res = requests.get(get_url)
    print (res.json()['results'])
    if len(res.json()['results']) == 0:
        get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=restaurant&key=" + google_api_key
        res = requests.get(get_url)
    parsed_list = res.json()['results']
    return parsed_list

#Spider house 7

def get_score(place, price_range):
    rating_score =  place.get('rating') if place.get('rating') is not None else 0
    price_score = 5 if place.get('price_level') is not None and place.get('price_level') <= int(price_range) else 0
    return rating_score + price_score


def get_accom(params,radius = '4000'):
    cor_x = params['coordinates']['x']
    cor_y = params['coordinates']['y']
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=lodging&key=" + google_api_key
    res = requests.get(get_url)
    parsed_list = res.json()['results']
    return parsed_list