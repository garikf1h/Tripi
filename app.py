from utils import app
from flask import send_from_directory
from api.helloApi import MapApiHandler
from api.googleApi import GoogleApiHandler
from api.googleApi2 import GoogleApiHandler2
from flask_cors import CORS  # comment this on deployment
from flask_restful import Api


CORS(app)  # comment this on deployment
api = Api(app)

map = MapApiHandler()
google = GoogleApiHandler()
google2 = GoogleApiHandler2()
# signup = HelloApiHandler()
# signup = HelloApiHandler()


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(map, '/map', endpoint='map')
api.add_resource(google2, '/trip', endpoint='trip')
api.add_resource(google, '/recommend', endpoint='recommend')
# api.add_resource(signup, '/signup', endpoint='signup')



if __name__ == '__main__':
    app.run(debug=True)
