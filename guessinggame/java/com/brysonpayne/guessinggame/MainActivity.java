package com.brysonpayne.guessinggame;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.EditText;;
import android.widget.Button;
import android.widget.Toast;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MenuInflater;

public class MainActivity extends Activity {
	private Button btn;
	private EditText input;
	private TextView message;
	private TextView help;
	int number = 0;
    int guess = 0;
    int numberOfTries = 0;
    boolean restartEnabled = false;
    int range = 100;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        input = (EditText)findViewById(R.id.input);
        message = (TextView)findViewById(R.id.result);
        help = (TextView)findViewById(R.id.help);
        btn = findViewById(R.id.button_id);
        btn.setOnClickListener(v -> {
            checkGuess();
        });
        range = getStoredIntKey("range", 100);
        restart();
    }
    public void checkGuess() {
        if (restartEnabled) {
            restart();
            return;
        }
        try {
            guess = Integer.parseInt(input.getText().toString());
        } catch (NumberFormatException e) {
            message.setText("Invalid Number!");
            return;
        }
        numberOfTries++;
        if  (guess > number) {
            message.setText(input.getText() + " is Too High!");
        } else if (guess < number) {
            message.setText(input.getText() + " is Too Low!");
        } else {
            message.setText(input.getText() + " is Correct!");
            Toast.makeText(MainActivity.this, "It took " + numberOfTries + " guesses!", Toast.LENGTH_LONG).show();
            btn.setText("New Game");
            restartEnabled = true;
            int gamesWon = getStoredIntKey("gamesWon", 0);
            storeIntKey("gamesWon", gamesWon+1);
        }
    }
    public void restart() {
        number = (int) (Math.random() * range + 1);
        help.setText("Enter a number between 1 and " + range + ":");
        btn.setText("Guess!");
        input.setText("");
        message.setText("");
        numberOfTries = 0;
        restartEnabled = false;
    }
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return true;
    }
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_settings:
                final CharSequence[] items = {"1 to 10", "1 to 100", "1 to 1000"};
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("Select the Range:");
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int item) {
                        range = (int) Math.pow(10, item+1);
                        storeIntKey("range", range);
                        restart();
                        dialog.dismiss();
                    }
                });
                AlertDialog alert = builder.create();
                alert.show();
                return true;
            case R.id.action_newgame:
                restart();
                return true;
            case R.id.action_gamestats:
                int gamesWon = getStoredIntKey("gamesWon", 0);
                AlertDialog statDialog = new AlertDialog.Builder(MainActivity.this).create();
                statDialog.setTitle("Guessing Game Stats:");
                statDialog.setMessage("You have won " + gamesWon + " games. Way to go!");
                statDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();
                            }
                        });
                statDialog.show();
                return true;
            case R.id.action_about:
                AlertDialog aboutDialog = new AlertDialog.Builder(MainActivity.this).create();
                aboutDialog.setTitle("About Guessing Game");
                aboutDialog.setMessage("(c)2018 Bryson Payne.");
                aboutDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();
                            }
                        });
                aboutDialog.show();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    @SuppressWarnings("deprecation")
    public void storeIntKey(String key, int newRange) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(key, newRange);
        editor.apply();
    }
    @SuppressWarnings("deprecation")
    public int getStoredIntKey(String key, int default_value) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        return preferences.getInt(key, default_value);
    }
}
