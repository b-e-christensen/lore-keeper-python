from email import message
from os import access, getenv
import sys
from urllib import response
from flask import Blueprint, jsonify, request
from server.db import init_db
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File, Tag, Content, content_tags
from server.db import get_db

bp = Blueprint('tag', __name__, url_prefix='/tag')

@bp.route('/', methods=['POST'])
@jwt_required()
def create_tag(): 
  db = get_db()
  data = request.get_json()
  try: 
    new_tag = Tag(
      title = data['title'],
      file_id = data['file_id']
    )
    content = db.query(Content).filter(Content.id == data['content_id']).one()
    content.tags.append(new_tag)
    db.commit()
  except: 
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'An error occured'), 404

  return jsonify(message="Tag successfully created.")

@bp.route('/content', methods=['POST'])
@jwt_required()
def get_tagged():
  data = request.get_json()
  db = get_db()
  contents = db.query(Content).filter(Content.file_id == data['file_id']).all()

  counter = 0
  contents_dict = {}

  for row in contents:
    tags_counter = 0
    tags_dict = {}
    tags = row.tags

    for sub_row in tags:
      if sub_row.id == int(data['tag_id']):
        contents_dict[counter] = {
          "id": row.id,
          "title": row.title,
          "number": row.number,
          "content": row.content,
          "user_id": row.user_id,
          "file_id": row.file_id,
          "image": row.image
      }
        for row in tags:
          tags_dict[tags_counter] = {
            "title": row.title,
            "id": row.id
          }
          tags_counter += 1
        contents_dict[counter]['tags'] = tags_dict
    counter += 1

  return { "contents": contents_dict }

@bp.route('/all', methods=['POST'])
@jwt_required()
def get_all_tags():
  data = request.get_json()
  db = get_db()
  all_tags = []
  tags = db.query(Tag).filter(Tag.file_id == data['file_id']).all()

  for row in tags:
    all_tags.append({ "id": row.id, "title": row.title })

  return jsonify(tags=all_tags)

@bp.route('/edit', methods=['POST'])
@jwt_required()
def edit_tags():
  data = request.get_json()
  db = get_db()
  try:
    content = db.query(Content).filter(Content.id == data['content_id']).one()
    tags = db.query(Tag).filter(Tag.id.in_(data['tag_array'])).all()
    content.tags = tags
    db.commit()
  except: 
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'An error occured'), 404

  return jsonify(message='Success!')