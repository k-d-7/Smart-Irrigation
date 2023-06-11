import serial.tools.list_ports
import sys
import time
import os
from dotenv import load_dotenv

from Adafruit_IO import MQTTClient

load_dotenv()
AIO_FEED_ID = ["temp", "led", "water-pump", "humidity"]  # ["bbc-led", "bbc-temp"]
AIO_USERNAME = os.getenv('AIO_USERNAME')
AIO_KEY = os.getenv('AIO_KEY')

print(AIO_USERNAME)
print(AIO_KEY)


def connected(client):
    print("Ket noi thanh cong ...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong ...")


def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload + " from " + feed_id)
    if feed_id == "led":
        if payload == "1":
            uart_write("3")
        else:
            uart_write("4")
    elif feed_id == "water-pump":
        if payload == "1":
            uart_write("1")
        else:
            uart_write("2")


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def uart_write(data):
    ser.write((str(data)).encode())
    return


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL C340" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    # return commPort
    return "COM3"


# if getPort() != "None":
ser = serial.Serial(port=getPort(), baudrate=115200)


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[0] == "T":
        client.publish("temp", splitData[1])
    elif splitData[0] == "H":
        client.publish("humidity", splitData[1])


mess = ""


def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if end == len(mess):
                mess = ""
            else:
                mess = mess[end + 1:]


while True:
    readSerial()
    time.sleep(1)
    pass
