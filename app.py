from flask import Flask, render_template, request, redirect,send_from_directory
from flask_mysqldb import MySQL
from flask_restful import Api, Resource, reqparse

from flask_cors import CORS  # comment this on deployment
from api.helloApi import HelloApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

CORS(app)  # comment this on deployment
api = Api(app)


app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(HelloApiHandler, '/flask', ['hello','signup' ])

@app.route('/signup', methods=["GET", "POST"])
def first():
    if request.method == "POST":
        print(request.)
        # cur = mysql.connection.cursor()
        # # cur.execute("CREATE TABLE EXAM1(ID INT PRIMARY KEY not null , email VARCHAR(255),   full_name VARCHAR(255), activity_level VARCHAR(2), number_of_child VARCHAR(2))")
        # full_name = request.form['full_name']
        # email = request.form['email']
        # id1 = request.form['ID_N']
        # number_of_child = request.form['select-number']
        # activity_level = request.form['active']
        # relationship_stat = request.form.getlist("selector")[0]
        # print(full_name, email, id1, number_of_child, activity_level, relationship_stat)
        # cur.execute("INSERT INTO EXAM1(ID, email, full_name, activity_level, number_of_child, relationship_status) VALUES(%s, %s,%s,%s,%s, %s)", (id1, email, full_name, activity_level, number_of_child, relationship_stat))
        # mysql.connection.commit()
        # return redirect("/")
    else:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM EXAM1''')
        a = cur.fetchall()
        print(a)
        return render_template("/Tripi_page_1.html")


@app.route('/', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        id_form = request.form['input_id'];
        email_form = request.form['input_email']
        cur.execute('''SELECT * FROM EXAM1 WHERE ID = %s AND email = %s''', (id_form, email_form))
        a = cur.fetchall()
        print(a)
        if len(a) == 0:
            return render_template("/login_page.html", status = False)
        else:
            return render_template("/Tripi_page_2.html", status = True)
    else:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM EXAM1''')
        a = cur.fetchall()
        print(a)
        return render_template("/login_page.html")


@app.route('/routeSearch', methods=["GET", "POST"])
def searchRoute():
    if request.method == 'POST':

        cur = mysql.connection.cursor()
    #     ## change to real name#
        free_text= request.form['free_search_input']
        region = request.form['select-region']
        accesability = request.form['selector']
        water = request.form['selector1']
        length = request.form['select-trip-length']
        print(free_text, region, accesability,water, length)
        cur.execute(
            '''SELECT name, shortDescription, Product_url,Starting_point_x,Starting_point_y  FROM TRACKS limit 100''')
        a = cur.fetchall()


#         cur.execute('''select TRACKS.* from TRACKS
# where (%s = false
# or TRACKS.Accessibility in ('כן','נגישות חלקית'))
# and (%s is null or MATCH (Name,ShortDescription,FullDescription) AGAINST (convert( %s to text) IN NATURAL LANGUAGE MODE))
# and %s = TRACKS.Region
# and (%s 'לא משנה' or TRACKS.Bathing_Waters = %s )
# and ( %s = Trail_Duration)''', (accesability, free_text,free_text,region,water,water,length))
#         a = cur.fetchall()


        print(a)
#         if len(a) == 0:
#             return render_template("/login_page.html", status = False)
#         else:
        return render_template("/Tripi_page_2.html", list_of_paths = a)
    else:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT name, shortDescription, Product_url,Starting_point_x,Starting_point_y  FROM TRACKS limit 100''')
        a = cur.fetchall()
        for route in a:
            print(route)
        return render_template("/Tripi_page_2.html")


if __name__ == '__main__':
    app.run(debug=True)
