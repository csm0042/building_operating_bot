#!python
""" CGI call used to interface with a wemo device on the same LAN as the web server """

import cgi
import cgitb
from multiprocessing import Pool
import os
import re
import sys
import pywemo


class CGIwemoInterface(object):
    """ class used to send commands and status querries to wemo devices on
        the LAN local to a web server
    """
    def __init__(self, port=None):
        #self.form = cgi.FieldStorage()
        self.name = str()
        self.addr = str()
        self.cmd = str()
        if port is not None:
            self.port = port
        else:
            self.port = None
        self.url = str()
        self.device = None
        self.state = None
        self.ipv4_regex = r'\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.' \
                          r'(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.' \
                          r'(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.' \
                          r'(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b'
        self.execute()


    def get_fields(self):
        """ parse data from CGI call url """
        #self.name = self.form['name']
        #self.addr = self.form['addr']
        #self.cmd = self.form['cmd']
        self.name = "ewlt1"
        self.addr = "192.168.86.27"
        self.cmd = "on"


    def discover_port(self):
        """ perform device discovery on local LAN """
        # 49153, 49152, 49154
        if self.port is None:
            try:
                print("searching for port")
                self.port = pywemo.ouimeaux_device.probe_wemo(self.addr)
            except Exception:
                self.port = None
                self.state = "offline"


    def discover_device(self):
        """ discover device once port is known """
        if self.port is not None:
            self.url = 'http://%s:%i/setup.xml' % (self.addr, self.port)
            try:
                print("discovering device at %s:%i" % (self.addr, self.port))
                self.device = pywemo.discovery.device_from_description(self.url, None)
                return self.device
            except Exception:
                self.device = None
                self.state = "offline"


    def turn_on(self):
        """ send "on" command to wemo device """
        if self.device is not None:
            print('turning on device')
            self.device.on()
            self.state = "1"
        else:
            self.state = "offline"


    def turn_off(self):
        """ send "off" command to wemo device """
        if self.device is not None:
            print('turning off device')
            self.device.off()
            self.state = "0"
        else:
            self.state = "offline"


    def get_state(self):
        """ query current state of wemo device """
        if self.device is not None:
            self.state = self.device.get_state(force_update=True)
        else:
            self.state = "offline"


    def execute(self):
        """ execute correct command sequence based on CGI call parameters """
        self.get_fields()
        # Only execute remaining commands if address was valid
        if re.fullmatch(self.ipv4_regex, self.addr) is not None and \
            (self.cmd.lower() == "on" or self.cmd == "1" or \
             self.cmd.lower() == "off" or self.cmd == "0" or \
             self.cmd.lower() == "ask" or self.cmd == "99"):
            self.discover_port()
            self.discover_device()
            if self.device is not None:
                if self.cmd.lower() == "on" or self.cmd == "1":
                    self.turn_on()
                elif self.cmd.lower() == "off" or self.cmd == "0":
                    self.turn_off()
                elif self.cmd.lower() == "ask" or self.cmd == "99":
                    self.get_state()
        else:
            self.state = "invalid ip address"


if __name__ == "__main__":
    # Enable CGI debugging
    cgitb.enable()
    # Disable print output while performing wemo commands
    sys.stdout = open(os.devnull, "w")
    # Create process pool
    mpool = Pool(3)
    # Run discovery / execute command process for each possible port
    mpool.map(CGIwemoInterface, (49153, 49152, 49154))
    # Re-enable print output
    sys.stdout = sys.__stdout__
    # Print resulting device state
