from flask_restful import Resource, reqparse, request
from utils import get_restaurants
import json


class GoogleApiHandler(Resource):

    def post(self):


        parser = reqparse.RequestParser()
        parser.add_argument('data', type=str)
        args = parser.parse_args()
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
        request_json = eval(args['data'])
        print(request_json)
        #data = (get_restaurants(request_json))
        #print(data)
        # # ret_status, ret_msg = ReturnData(request_type, request_json)
        # # currently just returning the req straight
        # # ret_status = request_type
        # ret_msg = data
        #
        # if ret_msg:
        #     message = format(data)
        # else:
        #     message = "No Msg"
        #
        # final_ret = {"status": "Success", "message": data}
        # # TODO: NEED to handle wrong cases

        return 0
