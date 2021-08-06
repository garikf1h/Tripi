from flask_restful import Resource, reqparse, request
from utils import get_restaurants, get_recommendation
import json


class GoogleApiHandler(Resource):
    def get(self):
        parser = request.headers
        print(self)
        print(parser)
        # print(args['config'])

        # data = get_trips({})
        return 0

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', type=str)
        args = parser.parse_args()
        # return args
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
        request_json = eval(args['data'])
        print(request_json)
        data = get_recommendation(request_json)
            #{"region":region,"access":accesability,"with_water":water,"length":length,"children":"לא","activity_level":"קל","price_range":1,"restaurant_type":"italian"}))

        print("printing recommended routes:")

        # print(data)

        return 12
