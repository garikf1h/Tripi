from flask import Flask, render_template, request, redirect, send_from_directory
from flask_mysqldb import MySQL
#import requests

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

google_api_key = 'AIzaSyAesDybIrVwbCEsSm0rGbwlB06zSIdxpgc'

def get_trips(searchInfo):
    cur = mysql.connection.cursor()
    #     ## change to real name#
    free_text = searchInfo['free_text']
    free_text_for_search = "%" + free_text + "%"
    region = searchInfo['region'] #hebrew
    accesability = searchInfo['access']
    water = searchInfo['with_water']
    length = searchInfo['length'] #0/1/2

    query = ("select name, shortDescription, Product_url,cast(Starting_point_x as char(10)) as Starting_point_x,cast(Starting_point_y as char(10)) as Starting_point_y FROM TRACKS"
             " where (%s = 'לא' or TRACKS.Accessibility in ('כן','נגישות חלקית'))"
             " and (%s ='' or Name like %s or ShortDescription like %s or FullDescription like %s)"
             " and (%s = TRACKS.Region or %s = 'הכל' or %s = '')"
             " and (%s='לא' or TRACKS.Bathing_Waters='כן')"
             " and (%s = 'הכל' or (%s = '0' and cast(Trail_Duration as unsigned) <5)"
             " or (%s = '1' and cast(Trail_Duration as unsigned) >= 5 and cast(Trail_Duration as unsigned) <9)"
             " or (%s = '2' and cast(Trail_Duration as unsigned) <= 9))"
             )
    cur.execute(query,
                [
                accesability,
                free_text, free_text_for_search, free_text_for_search, free_text_for_search,
                 region, region, region,
                 water,
                 length, length, length, length
                     ])
    a = cur.fetchall()
    print(a)
    data = {"data": a}
    return data

def get_restaurants(params,radius = '1500'):
    cor_x = params['coordinates']['x']
    cor_y = params['coordinates']['y']
    print(cor_y)
    print(cor_x)
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cor_y + "," + cor_x + "&radius=" + radius + "&type=restaurant&key=" + google_api_key
    res = requests.get(get_url)
    parsed_list = res.json()['results']
    return parsed_list

def get_accom(cordinates,radius = '1500'):
    get_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cordinates[0] + "," + cordinates[1] + "&radius=" + radius + "&type=accomodation&key=" + google_api_key
    res = requests.get(get_url)
    parsed_list = res.json()['results']
    return parsed_list
