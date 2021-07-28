from utils import app
from flask import send_from_directory
from api.helloApi import HelloApiHandler
from flask_cors import CORS  # comment this on deployment
from flask_restful import Api


CORS(app)  # comment this on deployment
api = Api(app)

# TODO: need to think how to handle the diffrenet cases for the routes
map = HelloApiHandler()
signup = HelloApiHandler()
# signup = HelloApiHandler()


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(map, '/map', endpoint='map')
api.add_resource(signup, '/signup', endpoint='signup')



if __name__ == '__main__':
    app.run(debug=True)
