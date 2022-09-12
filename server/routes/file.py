
from email import message
from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File, Content
from server.db import get_db

from server.helpers import check_for_existing_number

bp = Blueprint('file', __name__, url_prefix='/file')


@bp.route('/single', methods=['POST'])
@jwt_required()
def get_file():
    db = get_db()
    token_results = get_jwt()
    email = token_results['sub']
    fileId = request.json.get('fileId')
    # user = db.query(User).filter(User.email == email).one()
    file = db.query(File).filter(File.id == fileId).one()

    contents = db.query(Content).filter(Content.file_id == file.id).order_by(Content.number).all()

    file_dict = {
        "id": file.id,
        "title": file.title,
        "collaborators": file.collaborators,
    }
    contents_dict = {}
    counter = 0
    for row in contents:
      contents_dict[counter] = {
          "id": row.id,
          "title": row.title,
          "number": row.number,
          "content": row.content,
          "user_id": row.user_id,
          "file_id": row.file_id,
          "image": row.image
      }
      counter += 1

    return {"file": file_dict, "contents": contents_dict}


@bp.route('/content', methods=['POST', 'DELETE'])
@jwt_required()
def make_content():
  if request.method == 'POST':
    db = get_db()
    token_results = get_jwt()
    email = token_results['sub']
    user = db.query(User).filter(User.email == email).one()
    file_id = request.json.get('fileId')
    content_name = request.json.get('contentName')
    content_number = request.json.get('contentNumber')

    if not content_name:
        return jsonify("must provide a title", 403)
    elif not content_number:
        return jsonify("must provide number", 403)
    # elif not int(content_number) and not float(content_number):
    #     return jsonify("must provide number", 403)
    existing_content = db.query(Content).filter(Content.file_id == file_id).all()

    number_check = check_for_existing_number(existing_content, content_number)
    
    if not number_check:
      return { "message": "Parent number does not exist yet!."}

    new_content = Content(
        title=content_name,
        number=content_number,
        file_id=file_id,
        user_id=user.id
    )

    db.add(new_content)
    db.commit()

    return {"message": "Content successfully added!",
            "New Content": {
                'title': content_name,
                'number': content_number,
                'file_id': file_id,
                'user_id': user.id
            }}

  elif request.method == 'DELETE':
    id = request.json.get('content_id')
    db = get_db()
    try:
      db.delete(db.query(Content).filter(Content.id == id).one())
      db.commit()
    except: 
      print(sys.exc_info()[0])

      db.rollback()
      return jsonify(message = 'Content not found'), 404

    return { "message": "Delete Successful!"}


@bp.route('/update', methods=['POST'])
@jwt_required()
def update():
  content_id = request.json.get('content_id')
  text = request.json.get('text')
  print(text)
  db = get_db()

  content = db.query(Content).filter(Content.id == content_id).one()

  content.content = text

  db.commit()

  return { "Text Saved": text }

@bp.route('/content/update', methods=['POST'])
@jwt_required()
def update_content():
  data = request.get_json()
  db = get_db()

  existing_content = db.query(Content).filter(Content.file_id == data['file_id']).all()
  content = db.query(Content).filter(Content.id == data['content_id']).one()

  if content.number != data['number']:
    number_check = check_for_existing_number(existing_content, data['number'])
    if not number_check:
      return { "message": "Parent number does not exist yet!."}


  content.title = data['title']
  content.number = data['number']
  content.image = data['image']
  
  db.commit()

  return jsonify(message = 'you did it!')