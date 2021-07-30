from flask import Flask, render_template, request, redirect, send_from_directory
from flask_mysqldb import MySQL


app = Flask(__name__, static_url_path='', static_folder='frontend/build')

app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


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
             " where (%s = 'no' or TRACKS.Accessibility in ('כן','נגישות חלקית'))"
             " and (%s ='' or Name like %s or ShortDescription like %s or FullDescription like %s)"
             " and (%s = TRACKS.Region or %s = 'הכל' or %s = '')"
             " and ( TRACKS.Bathing_Waters=%s)"
             " and (%s = '' or (%s = '0' and cast(Trail_Duration as unsigned) <5)"
             " or (%s = '1' and cast(Trail_Duration as unsigned) >= 5 and cast(Trail_Duration as unsigned) <9)"
             " or (%s = '2' and cast(Trail_Duration as unsigned) <= 9))"
             )
    cur.execute(query,
                [accesability, free_text, free_text_for_search, free_text_for_search, free_text_for_search, region,
                 region, region, water, length, length, length, length])
    a = cur.fetchall()
    print(a)
    data = {"data": a}
    return data