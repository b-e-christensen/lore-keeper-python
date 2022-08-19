from server.db import Base
from sqlalchemy import Column, Integer, ForeignKey, String


class Tag(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    link = Column(String(200), nullable=False)
    content_id = Column(Integer, ForeignKey('contents.id'))
    
