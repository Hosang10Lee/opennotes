# Codes for TODOs

static void\
delete_event_cb (GtkWidget * widget, GdkEvent * event, gpointer data)
```
  // TODO-01
  gtk_main_quit ();
```

int\
create_player ()
```
  // TODO-02
  player.playbin = gst_element_factory_make ("playbin", "playbin");

  if (!player.playbin) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Set the URI to play */
  g_object_set (player.playbin, "uri",
      "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
      NULL);
```

void\
media_player_play ()
```
  // TODO-03
  gst_element_set_state (player.playbin, GST_STATE_PLAYING);
```

static void\
play_cb (GtkButton * button, gpointer data)
```
  // TODO-04
  media_player_play ();
```

void\
media_player_pause ()
```
  // TODO-05
  gst_element_set_state (player.playbin, GST_STATE_PAUSED);
```

static void\
pause_cb (GtkButton * button, gpointer data)
```
  // TODO-06
  media_player_pause ();
```

void\
media_player_stop ()
```
  // TODO-07
  gst_element_set_state (player.playbin, GST_STATE_READY);
```

static void\
stop_cb (GtkButton * button, gpointer data)
```
  // TODO-08
  media_player_stop ();
```

int\
create_player ()
```
  // TODO-09
  g_signal_connect (G_OBJECT (bus), "message::state-changed",
      (GCallback) state_changed_cb, NULL);
```
static void\
state_changed_cb (GstBus * bus, GstMessage * msg, gpointer data)
```
  // TODO-09
  GstState old_state, new_state, pending_state;
  gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
  if (GST_MESSAGE_SRC (msg) == GST_OBJECT (player.playbin)) {
    player.state = new_state;
    g_print ("Player state set to %s\n",
        gst_element_state_get_name (new_state));
  }
```

int\
create_player ()
```
  // TODO-10
  /* Connect to interesting signals in playbin */
  g_signal_connect (G_OBJECT (player.playbin), "video-tags-changed",
      (GCallback) tags_cb, NULL);
  g_signal_connect (G_OBJECT (player.playbin), "audio-tags-changed",
      (GCallback) tags_cb, NULL);
  g_signal_connect (G_OBJECT (player.playbin), "text-tags-changed",
      (GCallback) tags_cb, NULL);
```

int\
create_player ()
```
  // TODO-11
  g_signal_connect (G_OBJECT (bus), "message::application",
      (GCallback) application_cb, NULL);
  gst_object_unref (bus);
```

static void\
stream_info_cb (const gchar * str)
```
    // TODO-12
  GtkTextBuffer *text;

  /* Clean current contents of the widget */
  text = gtk_text_view_get_buffer (GTK_TEXT_VIEW (app.streams_list));
  gtk_text_buffer_set_text (text, "", -1);

  gtk_text_buffer_insert_at_cursor (text, str, -1);
```

gint64\
media_player_get_duration_ns ()
```
  // TODO-13
  if (!gst_element_query_duration (player.playbin, GST_FORMAT_TIME, &duration)) {
    g_printerr ("Could not query current duration.\n");
    return -1;
  }
```

gint64\
media_player_get_current_position_ns ()
```
  // TODO-14
  if (!gst_element_query_position (player.playbin, GST_FORMAT_TIME, &current))
    return -1;
```
static void\
slider_cb (GtkRange * range, gpointer data)
```
  // TODO-15
  gdouble value = gtk_range_get_value (GTK_RANGE (app.slider));
  g_print ("seek position: %f seconds\n", value);
  media_player_seek (value);
```

void\
media_player_seek (gdouble value)
```
  // TODO-16
  gst_element_seek_simple (player.playbin, GST_FORMAT_TIME,
      GST_SEEK_FLAG_FLUSH | GST_SEEK_FLAG_KEY_UNIT,
      (gint64) (value * GST_SECOND));
```

int\
main (int argc, char *argv[])
```
  // TODO-17
  /* Initialize the speech command recognizer. */
  if (argc > 1)
    speech_recognizer_init (argv[1]);
  else 
    speech_recognizer_init (NULL);  

  /* Install callbacks to retreive the detected speech commands. */
  recognizer_callbacks.command = speech_command_cb;
  speech_recognizer_install_callbacks (&recognizer_callbacks, NULL);
```

gboolean\
speech_recognizer_init (const char *argv1)
```
  // TODO-18
  /* init pipeline */
  if (argv1 != NULL) {
    str_pipeline =
        g_strdup_printf
        ("filesrc name=audio_src location=%s ! decodebin ! audioconvert ! audioresample ! audio/x-raw,rate=16000,format=S16LE,channels=1 ! tee name=t_raw "
        "t_raw. ! queue ! goom ! textoverlay name=tensor_res font-desc=Sans,24 ! videoconvert ! ximagesink name=vsink "
        "t_raw. ! queue ! tensor_converter frames-per-tensor=1600 ! "
        "tensor_aggregator frames-in=1600 frames-out=16000 frames-flush=3200 frames-dim=1 ! "
        "tensor_transform mode=arithmetic option=typecast:float32,div:32767.0 ! "
        "tensor_filter framework=custom model=./libnnscustom_speech_command_tflite.so ! "
        "tensor_filter framework=tensorflow-lite model=%s ! tensor_sink name=tensor_sink",
        argv1, recognizer.tflite_info.model_path);
  }
  else {
    str_pipeline =
        g_strdup_printf
        ("alsasrc name=audio_src device=%s ! queue ! audioconvert ! audio/x-raw,rate=16000,format=S16LE,channels=1 ! tee name=t_raw "
        "t_raw. ! queue ! goom ! textoverlay name=tensor_res font-desc=Sans,24 ! videoconvert ! ximagesink name=vsink "
        "t_raw. ! queue ! tensor_converter frames-per-tensor=1600 ! "
        "tensor_aggregator frames-in=1600 frames-out=16000 frames-flush=3200 frames-dim=1 ! "
        "tensor_transform mode=arithmetic option=typecast:float32,div:32767.0 ! "
        "tensor_filter framework=custom model=./libnnscustom_speech_command_tflite.so ! "
        "tensor_filter framework=tensorflow-lite model=%s ! tensor_sink name=tensor_sink",
        alsa_device, recognizer.tflite_info.model_path);
  }

  recognizer.pipeline = gst_parse_launch (str_pipeline, NULL);
  g_free (str_pipeline);
  _check_cond_err (recognizer.pipeline != NULL);

  /* bus and message callback */
  recognizer.bus = gst_element_get_bus (recognizer.pipeline);
  _check_cond_err (recognizer.bus != NULL);

  /* Set the speech command pipeline's ximagesink to be drawn on the app window. */
  gst_bus_set_sync_handler (recognizer.bus,
      (GstBusSyncHandler) bus_sync_handler, NULL, NULL);
```

```
  // TODO-19
  /* tensor sink signal : new data callback */
  element = gst_bin_get_by_name (GST_BIN (recognizer.pipeline), "tensor_sink");
  handle_id =
      g_signal_connect (element, "new-data", (GCallback) new_data_cb, NULL);
  gst_object_unref (element);
  _check_cond_err (handle_id > 0);
```

```
  // TODO-20
  /* timer to update result */
  recognizer.timer_id = g_timeout_add (500, timer_update_result_cb, NULL);
  _check_cond_err (recognizer.timer_id > 0);
```

static gboolean\
timer_update_result_cb (gpointer user_data)
```
      // TODO-21
      overlay =
          gst_bin_get_by_name (GST_BIN (recognizer.pipeline), "tensor_res");
      g_object_set (overlay, "text", (label != NULL) ? label : "", NULL);
      gst_object_unref (overlay);
```

static void\
speech_command_cb (const gchar * cmd)
```
  /* Map speech commands to player functions */

  // TODO-22
  if (g_strrstr (cmd, "on") || g_strrstr (cmd, "go")) {
    media_player_play ();
  }

  // TODO-23
  if (g_strrstr (cmd, "stop") || g_strrstr (cmd, "no")) {
    media_player_stop ();
  }

  // TODO-24
  if (g_strrstr (cmd, "off")) {
    media_player_stop ();
    gtk_main_quit ();
  }

  // TODO-25
  if (g_strrstr (cmd, "left")) {
    gdouble value = gtk_range_get_value (GTK_RANGE (app.slider));
    media_player_seek (value - 10);
  }

  // TODO-26
  if (g_strrstr (cmd, "right")) {
    gdouble value = gtk_range_get_value (GTK_RANGE (app.slider));
    media_player_seek (value + 10);
  }
```