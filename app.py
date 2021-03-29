from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_USER'] = 'ufpe0xnpo9blexdh'
app.config['MYSQL_PASSWORD'] = 'Yr7thNuzm2UvJHWDjb23'
app.config['MYSQL_HOST'] = 'bjgckwqx0c8k9fsiwtja-mysql.services.clever-cloud.com'
app.config['MYSQL_DB'] = 'bjgckwqx0c8k9fsiwtja'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/signup', methods=["GET", "POST"])
def first():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        # cur.execute("CREATE TABLE EXAM1(ID INT PRIMARY KEY not null , email VARCHAR(255),   full_name VARCHAR(255), activity_level VARCHAR(2), number_of_child VARCHAR(2))")
        full_name = request.form['full_name']
        email = request.form['email']
        id1 = request.form['ID_N']
        number_of_child = request.form['select-number']
        activity_level = request.form['active']
        relationship_stat = request.form.getlist("selector")[0]
        print(full_name, email, id1, number_of_child, activity_level, relationship_stat)
        cur.execute("INSERT INTO EXAM1(ID, email, full_name, activity_level, number_of_child, relationship_status) VALUES(%s, %s,%s,%s,%s, %s)", (id1, email, full_name, activity_level, number_of_child, relationship_stat))
        mysql.connection.commit()
        return redirect("/")
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
            return render_template("/login_page.html", status = True)
    else:
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM EXAM1''')
        a = cur.fetchall()
        print(a)
        return render_template("/login_page.html")


if __name__ == '__main__':
    app.run(debug=True)
