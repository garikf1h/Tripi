from flask_restful import Resource, reqparse, request
from utils import get_restaurants, get_accom
import json


class GoogleApiHandler2(Resource):

    def post(self):
        print('post in route');
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('data', type=str)
        args = parser.parse_args()
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
        request_json = eval(args['data'])
        print(request_json)


        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
        request_json = eval(args['data'])
        print(request_json)
        if args['type'] == 'rest':
            data = get_restaurants(request_json, 'all')
        else:
            data = get_accom(request_json)
        # {"region":region,"access":accesability,"with_water":water,"length":length,"children":"לא","activity_level":"קל","price_range":1,"restaurant_type":"italian"}))

        print("printing recommended routes:")

        print(data)

        return data
