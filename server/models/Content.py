from datetime import datetime
from email.policy import default
from enum import unique
from server.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, Boolean, Table
from sqlalchemy.orm import relationship

content_tags = Table(
  'content_tags',
  Base.metadata,
  Column('content_id', ForeignKey('contents.id')),
  Column('tag_id', ForeignKey('tags.id'))
)


class Content(Base):
    __tablename__ = 'contents'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    # to decide where it falls in the file structure. 
    number = Column(Float, nullable=False)
    content = Column(Text, nullable=True)
    image = Column(Text, nullable=True)
    section = Column(Boolean, default=False)

    tags = relationship('Tag', secondary=content_tags, backref='contents')

    # to show who made the content? 
    user_id = Column(Integer, ForeignKey('users.id'))
    file_id = Column(Integer, ForeignKey('files.id'))

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user = relationship('User')