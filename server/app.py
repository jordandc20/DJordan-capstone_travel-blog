#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User,City,CityNote,Location,LocationNote

class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)
api.add_resource(Home, '/')

class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict() for user in User.query.all()]
            if not users:
                return make_response({'error':'no users exist'}, 404)
            return make_response(
                users,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
api.add_resource(Users, '/users')

class Cities(Resource):
    def get(self):
        try:
            cities = [city.to_dict() for city in City.query.all()]
            if not cities:
                return make_response({'error':'no cities exist'}, 404)
            return make_response(
                cities,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
api.add_resource(Cities, '/cities')

class CityNotes(Resource):
    def get(self):
        try:
            notes = [note.to_dict() for note in CityNote.query.all()]
            if not notes:
                return make_response({'error':'no notes exist'}, 404)
            return make_response(
                notes,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
api.add_resource(CityNotes, '/citynotes')

class Locations(Resource):
    def get(self):
        try:
            locations = [location.to_dict() for location in Location.query.all()]
            if not locations:
                return make_response({'error':'no locations exist'}, 404)
            return make_response(
                locations,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
api.add_resource(Locations, '/locations')


class LocationNotes(Resource):
    def get(self):
        try:
            notes = [note.to_dict() for note in LocationNote.query.all()]
            if not notes:
                return make_response({'error':'no notes exist'}, 404)
            return make_response(
                notes,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
api.add_resource(LocationNotes, '/locationnotes')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    
    