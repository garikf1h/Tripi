from flask import Flask, render_template, request, redirect, send_from_directory
from flask_mysqldb import MySQL


app = Flask(__name__, static_url_path='', static_folder='frontend/build')

app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


def get_trips():
    cur = mysql.connection.cursor()
    cur.execute(
        '''SELECT name, shortDescription, Product_url,Starting_point_x,Starting_point_y  FROM TRACKS limit 100''')
    a = cur.fetchall()
    ls = []
    for route in a:
        ls.append(route)
    print(ls)