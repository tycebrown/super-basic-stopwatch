### To setup in development mode:
1.  Navigate to this folder (`/super-basic-stopwatch/ex2`)
2.  In the command line, run:
    - For bash:
      ```
      python3 -m venv .venv
      . .venv/bin/activate
      ```
    - For cmd.exe (windows):
      ```
      python3 -m venv .venv
      .venv\Scripts\activate
      ```
    - For any other shell, see [here](https://docs.python.org/3/library/venv.html#how-venvs-work)
3. Finally, install dependencies:
   ```
   pip install -r requirements.txt
   ```


### To run in development mode:
```
flask --app app.py 
```
