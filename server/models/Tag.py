from db import Base
from sqlalchemy import Column, Integer, ForeignKey

class Tag(Base):
  __tablename__ = 'tags'
  id = Column(Integer, primary_key=True)
  first_content_id = Column(Integer, ForeignKey('contents.id'))
  second_content_id = Column(Integer, ForeignKey('contents.id'))