---
layout: project
title: Lab 1
description: 
technologies: [VS Code, GitHub, Arduino, Python, Jupyter Notebook, Redboard Arduino Nano]
image: /assets/images/lab1-redboard.jpg
category: fast-robots-labs
---

<!-- Intro paragraph -->
Lab 1 was divided into two parts, and we were given two weeks to complete the assignment. Part Lab 1A, taught us a bit about the Arduino IDE and programming the Artemis board. This involved running various programs on the board that were baked into the IDE, and it was something of a Prelab for Part 1B. Part 1B taught us about Bluetooth connectivity and using Jupyter Lab notebooks. This involved more free-thinking and use of both Arduino and Jupyter notebook to find correct UUIDs and send the right Bluetooth signals.  
  
**Materials:**  
- 1 x SparkFun Redboard Artemis Nano
- 1 x USB Type-C Cable  
  
## Lab 1A  


**Part 1**  

For the first part we simply downloaded the relevant Redboard Arduino Library from the Library Manager. I had issues with connectivity, and fixed them by downloading a CH340 Driver. The video below shows a successful connection.

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a1.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

**Part 2**  

Here, I run the **Blink** script from Arduino from **File -> Examples -> Blink**

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a2.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

**Part 3**  

Here, I run the **Serial** script from Arduino from **File -> Examples -> Apollo3 -> Example4_Serial**. To view the output I open the Serial Monitor and ensure the baud rate is 115200.

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a3.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

**Part 4**  

Here, I run the **Analog Read** script from **File -> Examples -> Apollo3 -> Example2_analogRead** in order to test the temperature sensor. I move my finger on and off of it, as well as blow on it to get the temperature to change. I view the output in the serial monitor.

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a4.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

**Part 5**  

Here, I run the **Microphone Output** script from **File -> Examples -> PDM -> Example1_MicrophoneOutput** in order to test the microphone. I make various noise and view the changes within the Serial Monitor.

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a5.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

**Part 6 (5000-Level Students)**  

For the last part of the Prelab/Part 1A I create something like an electronic tuner by using the **Microphone Output** from before and, although imperfect becuase I did not make it the exact range, I have certain frequency ranges print A4, D4, or E6. I view the changes in the Serial Monitor and use an online frequency generator to play frequencies for the code I write to detect.

<div style="max-width: 680px; margin: 20px 0;">
  <video controls preload="metadata" playsinline style="width: 100%; height: auto; border-radius: 12px;">
    <source src="{{ '/assets/videos/lab1a6.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>  

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>
    Arduino
  </div>

  <div class="code-content">
<pre><code class="language-python">

  // After ui32LoudestFrequency runs...
  if (ui32LoudestFrequency < 380) {
    Serial.printf("Out of range\n");
  }
  else if (ui32LoudestFrequency < 440) {
    Serial.printf("A4\n");
  }
  else if (ui32LoudestFrequency < 587) {
    Serial.printf("D5\n");
  }
  else if (ui32LoudestFrequency < 1317) {
    Serial.printf("E6\n");
  }
  else {
    Serial.printf("Out of range\n");
  }

</code></pre>
  </div>
</div>

## Lab 1B
To set up this part of the lab I set up a Python virtual environment through the Windows Command Prompt, installed Jupyter Lab, and added needed dependencies and course files. I then successfully launcehed the Jupyter server. I flashed ble_arduino.ino onto the Artemis, and retrieved its MAC address. I then generated a UUID to update the connection.yaml configuration. The purpose of this part of the lab is to be able to test our sensors better by creating a wireless debugging system. This part will ensure we recieve timestamped messages from the Artemis Board.  

**Part 1**  
In this part the ECHO command is used to send a string from the computer to the Artemis Board. The computer then recieves and prints the string.

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case ECHO:

    char char_arr[MAX_MSG_SIZE];

    // Extract the next value from the command string as a character array
    success = robot_cmd.get_next_value(char_arr);
    if (!success)
        return;

    tx_estring_value.clear();
    tx_estring_value.append("OkiKar --> ");
    tx_estring_value.append(char_arr);
    tx_estring_value.append(" :)");
    tx_characteristic_string.writeValue(tx_estring_value.c_str());
    Serial.println(tx_estring_value.c_str());
    
    break;

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.send_command(CMD.ECHO, "Finally...")
  s = ble.receive_string(ble.uuid['RX_STRING'])
  print(s)

</code></pre>
  </div>
</div>

![Serial Monitor 1b1]({{ "/assets/images/1b1.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

**Part 2**  
For the next task we send three floats to the Artemis board using the SEND_THREE_FLOATS command and read the three values from the Serial Monitor.

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case SEND_THREE_FLOATS:
              
    float f1,f2,f3;

    success=robot_cmd.get_next_value(f1);
    if (!success)
        return;

    success=robot_cmd.get_next_value(f2);
    if (!success)
        return;

    success=robot_cmd.get_next_value(f3);
    if (!success)
        return;

    Serial.print("Three floats: ");
    Serial.print(f1);
    Serial.print(", ");
    Serial.print(f2);
    Serial.print(", ");
    Serial.print(f3);
    break;

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">
  
  ble.send_command(CMD.SEND_THREE_FLOATS, "1.00|2.00|3.00")

</code></pre>
  </div>
</div>

![Serial Monitor 1b2]({{ "/assets/images/1b2.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

**Part 3**  
In this part I add a command GET_TIME_MILLIS which makes the robot reply write a string, such as “T:123456” to the string characteristic.

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case GET_TIME_MILLIS:

    tx_estring_value.clear();
    tx_estring_value.append("T: ");
    tx_estring_value.append((int)millis());
    tx_characteristic_string.writeValue(tx_estring_value.c_str());
    Serial.println("Elapsed time: ");
    Serial.println(tx_estring_value.c_str());

    break;

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">
  
  ble.send_command(CMD.GET_TIME_MILLIS, "")
  t = ble.receive_string(ble.uuid['RX_STRING'])
  print(t)

</code></pre>
  </div>
</div>

![Serial Monitor 1b3]({{ "/assets/images/1b3.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

**Part 4**  
Set up a notification handler in Python to receive the string value (the BLEStringCharactersitic in Arduino) from the Artemis board. In the callback function, extract the time from the string.

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  times = []  # store parsed timestamps here

  def notif_handler(uuid, notif):
      n = ble.bytearray_to_string(notif).strip()
      # Expect strings like "T:12345"
      t = float(n.split("T:")[1])
      times.append(t)
      print(f"T: {t}")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.start_notify(ble.uuid["RX_STRING"], notif_handler)
  print("Notifications started")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.send_command(CMD.GET_TIME_MILLIS, "")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  len(times)

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.stop_notify(ble.uuid["RX_STRING"])
  print("Notifications stopped")

</code></pre>
  </div>
</div>

![Python 1b4]({{ "/assets/images/1b4.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

**Part 5**  
Write a loop that gets the current time in milliseconds and sends it to your laptop to be received and processed by the notification handler. Collect these values for a few seconds and use the time stamps to determine how fast messages can be sent. What is the effective data transfer rate of this method?

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  times = []  # store parsed timestamps here

  def notif_handler(uuid, notif):
      n = ble.bytearray_to_string(notif).strip()
      # Expect strings like "T:12345"
      t = float(n.split("T:")[1])
      times.append(t)
      print(f"T: {t}")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.start_notify(ble.uuid["RX_STRING"], notif_handler)

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  import time
  times.clear()
  start_time = time.time()

  for _ in range(100):
      ble.send_command(CMD.GET_TIME_MILLIS, "")

  time.sleep(2)   # allow notifications to arrive
  end_time = time.time()

</code></pre>
  </div>
</div>

![Python 100 timestamps]({{ "/assets/images/1b5_1.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  elapsed = end_time - start_time
  num_received = len(times)

  print("Messages received:", num_received)
  print("Elapsed time:", elapsed)
  print("Rate (messages/sec):", num_received / elapsed)

</code></pre>
  </div>
</div>

C

**Part 6**  
Create an array that can store time stamps. This array should be defined globally so that other functions can access it if need be. In the loop, rather than send each time stamp, place each time stamp into the array. (Note: you’ll need some extra logic to determine when your array is full so you don’t “over fill” the array.) Then add a command **SEND_TIME_DATA** which loops the array and sends each data point as a string to your laptop to be processed. (You can store these values in a list in python to determine if all the data was sent over.)  

- Added the following to the Arduino code underneath the line:  
  - unsigned long currentMillis = 0;  

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  #define MAX_SAMPLES 100
  unsigned long time_data[MAX_SAMPLES];
  int data_index = 0;

</code></pre>
  </div>
</div>

- Added **SEND_TIME_DATA** to the list of **CommandTypes** in Arduino as well as in the **cmd_types.py** file in Jupyter Lab.
- Changed **GET_TIME_MILLIS** and wrote **case** for **SEND__TIME_DATA**:  

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case GET_TIME_MILLIS:

    if (data_index < MAX_SAMPLES) {
        time_data[data_index] = millis();
        data_index++;
    }

    tx_estring_value.clear();
    tx_estring_value.append("T:");
    tx_estring_value.append((int)millis());
    tx_characteristic_string.writeValue(tx_estring_value.c_str());
    Serial.println("Elapsed time: ");
    Serial.println(tx_estring_value.c_str());

    break;

</code></pre>
  </div>
</div>

  <div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case SEND_TIME_DATA:

    for (int i = 0; i < data_index; i++) {

        tx_estring_value.clear();
        tx_estring_value.append("T:");
        tx_estring_value.append((int)time_data[i]);

        tx_characteristic_string.writeValue(tx_estring_value.c_str());

        delay(5);   // small BLE spacing
    }

    data_index = 0;   // reset buffer

    break;

</code></pre>
  </div>
</div>

- Finally, I added following Jupyter cells, ran code, and watched the serial monitor count up:

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  for _ in range(100):
    ble.send_command(CMD.GET_TIME_MILLIS, "")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.send_command(CMD.SEND_TIME_DATA, "")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  len(times)

</code></pre>
  </div>
</div>

**Part 7**  
Add a second array that is the same size as the time stamp array. Use this array to store temperature readings. Each element in both arrays should correspond, e.e., the first time stamp was recorded at the same time as the first temperature reading. Then add a command GET_TEMP_READINGS that loops through both arrays concurrently and sends each temperature reading with a time stamp. The notification handler should parse these strings and add populate the data into two lists.  

- Added the following under the line from the previous section: unsigned long time_data[MAX_SAMPLES];

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  float temp_data[MAX_SAMPLES];

</code></pre>
  </div>
</div>

- Adjusted **GET_TIME_MILLIS** to collect temperature data as well as time data:

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

  case GET_TIME_MILLIS:

    if (data_index < MAX_SAMPLES) {
      time_data[data_index] = millis();

      // Read temperature (Artemis internal temp sensor)
      // If your codebase already has a function for this, use that instead.
      float tempC = getTempDegC();   // variable to store temperature data
      temp_data[data_index] = tempC;

      data_index++;
    }

    tx_estring_value.clear();
    tx_estring_value.append("T:");
    tx_estring_value.append((int)millis());
    tx_characteristic_string.writeValue(tx_estring_value.c_str());
    Serial.println("Elapsed time: ");
    Serial.println(tx_estring_value.c_str());

    break;

</code></pre>
  </div>
</div>

- Added **GET_TEMP_READINGS** to the list of **CommandTypes** in Arduino as well as in the **cmd_types.py** file in Jupyter Lab.
- Final Arduino code: write **case** for **GET_TEMP_READINGS**:

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Arduino</div>

  <div class="code-content">
<pre><code class="language-python">

case GET_TEMP_READINGS:

  for (int i = 0; i < data_index; i++) {
    tx_estring_value.clear();
    tx_estring_value.append("T:");
    tx_estring_value.append((int)time_data[i]);   // EString supports int

    tx_estring_value.append("|C:");
    tx_estring_value.append((float)temp_data[i]); // EString supports float

    tx_characteristic_string.writeValue(tx_estring_value.c_str());
    delay (5);
  }
  
  data_index = 0;  // reset buffer after sending
  break;

</code></pre>
  </div>
</div>

- Python side (in Jupyter Notebook):

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  times = []
  temps = []

  def notif_handler(uuid, notif):
    n = ble.bytearray_to_string(notif).strip()

    # Only parse lines that contain BOTH time and temp
    if n.startswith("T:") and "|C:" in n:
        t_str, c_str = n.split("|C:")
        t = float(t_str.split("T:")[1])
        c = float(c_str)

        times.append(t)
        temps.append(c)
        print(f"T={t}, C={c}")
    else:
        # helpful debug
        print("IGNORED:", n)

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.start_notify(ble.uuid["RX_STRING"], notif_handler)

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  N = 100
  times.clear()
  temps.clear()

  for _ in range(N):
      ble.send_command(CMD.GET_TIME_MILLIS, "")

</code></pre>
  </div>
</div>

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.send_command(CMD.GET_TEMP_READINGS, "")

</code></pre>
  </div>
</div>

![Temp readings]({{ "/assets/images/1b7_temps.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  len(times), len(temps), times[:3], temps[:3]

</code></pre>
  </div>
</div>

![Temp and Time Arrays]({{ "/assets/images/1b7_arrays.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"} 

<div class="code-window">
  <div class="code-header">
    <div class="code-dots">
      <div class="code-dot dot-red"></div>
      <div class="code-dot dot-yellow"></div>
      <div class="code-dot dot-green"></div>
    </div>Jupyter (Python)</div>

  <div class="code-content">
<pre><code class="language-python">

  ble.stop_notify(ble.uuid["RX_STRING"])

</code></pre>
  </div>
</div>



**Part 8**  
Discuss the differences between these two methods, the advantages and disadvantages of both and the potential scenarios that you might choose one method over the other. How “quickly” can the second method record data? The Artemis board has 384 kB of RAM. Approximately how much data can you store to send without running out of memory?  

- Both methods have different transfer rates. Collecting data in the Arduino IDE program creates consistent intervals to be internally set by the user. The "quickness" of the data collection is determined by the delay. Collecting data with the notification handler is dependent on the speed of the computer. If the user is looking for consistent data intervals, then the second method is better. As the labs continue: multiple commands will probably be found in the Artemis' main loop, which could make a large delay. Using the notification handler will interrupt the script, which could save time. If the Artemis has 384 kB of RAM then we can store approximately 96,000 data points at 4 bytes per. These are divided between all the data arrays in this case for Time and Temperature (excluding memory required for the script and variables).

## Additional Tasks for 5000-level Students

**1. Effective Data Rate And Overhead:** Send a message from the computer and receive a reply from the Artemis board. Note the respective times for each event, calculate the data rate for 5-byte replies and 120-byte replies. Do many short packets introduce a lot of overhead? Do larger replies help to reduce overhead? You may also test additional reply sizes. Please include at least one plot to support your write-up.  

- If RTT is roughly similar for 5B and 120B, then small packets waste bandwidth (same overhead, less payload).
- Larger replies usually improve effective throughput until you hit BLE/MTU/fragmentation limits.

**2. Reliability:** What happens when you send data at a higher rate from the robot to the computer? Does the computer read all the data published (without missing anything) from the Artemis board? Include your answer in the write-up.  

- At low/moderate rates (bigger delay), you should see 0 missing.
- As you push faster (small delay), you’ll eventually see drops.
- Conclusion: BLE notifications have throughput limits; not all packets are received at high rate.