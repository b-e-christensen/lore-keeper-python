from datetime import datetime
from enum import unique
from server.db import Base
from sqlalchemy import Column, Integer, String, DateTime, LargeBinary, Text, ForeignKey
from sqlalchemy.orm import relationship

# Picture table. By default the table name is filecontent
class Image(Base):
      # """ 
      # The first time the app runs you need to create the table. In Python
      # terminal import db, Then run db.create_all()
      # """
    __tablename__ = 'images'
    id = Column(Integer,  primary_key=True)
    name = Column(String(128), nullable=False)
    data = Column(LargeBinary, nullable=False) #Actual data, needed for Download
    rendered_data = Column(Text, nullable=False)#Data to render the pic in browser
    caption = Column(Text)
    location = Column(String(64))
    created_at = Column(DateTime, default=datetime.now)
    content_id = Column(Integer, ForeignKey('contents.id'))
    content = relationship('Content')
    def __repr__(self):
        return f'Pic Name: {self.name} Data: {self.data} caption: {self.caption} created on: {self.created_at} location: {self.location}'