from flask_restful import Resource, reqparse, request
from utils import get_rest_filtered, get_accom_filtered
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
        print(args)
        if args['type'] == 'rest':
            data = get_rest_filtered(request_json)
        else:
            data = get_accom_filtered(request_json)
        # {"region":region,"access":accesability,"with_water":water,"length":length,"children":"לא","activity_level":"קל","price_range":1,"restaurant_type":"italian"}))

        print("printing recommended routes:")

        print(data)

        return data
