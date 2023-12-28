#!/usr/bin/python3

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

import sys
import os

current_dir = os.path.dirname(os.path.abspath("thrift_build"))
sys.path.append(os.path.join(current_dir, ".."))
from thrift_build.note import NoteService, ttypes


transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = NoteService.Client(protocol)
transport.open()

note = ttypes.Note(title="My Note", content="This is my first note")
client.saveNote(note)

note = client.getNote("My Note")
print(note.title, note.content)

transport.close()
