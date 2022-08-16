from models import User, File, Content, Tag
from db import Session, Base, engine


# drop and rebuild tables
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = Session()

# insert users
db.add_all([
  User(username='alesmonde0', email='nwestnedge0@cbc.ca', password='password123'),
  User(username='jwilloughway1', email='rmebes1@sogou.com', password='password123'),
  User(username='iboddam2', email='cstoneman2@last.fm', password='password123'),
  User(username='dstanmer3', email='ihellier3@goo.ne.jp', password='password123'),
  User(username='djiri4', email='gmidgley4@weather.com', password='password123')
])

db.commit()

db.add_all([
  File(title='Test File', collaborators=['Hey', 'Hello'], user_id=1)
])

db.commit()

db.add_all([
  Content(title='Test Content No. 1', number='1', content='this is really important stuff', user_id=1, file_id=1),
  Content(title='Test Content No. 2', number='1', content='this is even more really important stuff! No. 2', user_id=1, file_id=1)
])

db.commit()

db.add_all([
  Tag(content_id=1, title='silly goose', link='hey.com')
])

db.commit()

db.close()