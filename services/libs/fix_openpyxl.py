import os
for dname, dirs, files in os.walk("openpyxl"):
    for fname in files:
        fpath = os.path.join(dname, fname)
        try:
            with open(fpath) as f:
                s = f.read()
            s = s.replace("openpyxl.", "..")
            with open(fpath, "w") as f:
                f.write(s)
        except Exception as e:
            print(str(e))
