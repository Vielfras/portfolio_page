#!/usr/bin/python3

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import sys
import os

current_dir = os.path.dirname(os.path.abspath("thrift_build"))
sys.path.append(os.path.join(current_dir, ".."))
from thrift_build.note import NoteService, ttypes


class NoteHandler(NoteService.Iface):
    def saveNote(self, note):
        # Save the note to a file
        with open(note.title + ".txt", "w") as file:
            file.write(note.content)

    def getNote(self, title):
        # Read the note from a file
        with open(title + ".txt", "r") as file:
            content = file.read()
            return ttypes.Note(title=title, content=content)

handler = NoteHandler()
processor = NoteService.Processor(handler)
transport = TSocket.TServerSocket(port=9090)
tfactory = TTransport.TBufferedTransportFactory()
pfactory = TBinaryProtocol.TBinaryProtocolFactory()

server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
server.serve()
