
# בוחרים את הבסיס של התמונה
FROM node:22

# הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app
# העתקי את קבצי התלויות (package.json ו־package-lock.json אם יש)
COPY package.json ./
COPY package-lock.json ./
.
# התקנת התלויות של הפרויקט
RUN npm install

# העתקת קבצי הפרויקט לתוך הקונטיינר
COPY . 

# בניית הפרויקט
RUN npm run build
# שלב 2: שרת Nginx לאירוח הקבצים הסטטיים
FROM nginx:alpine

# מעתיקים את ה-build שנוצר בשלב הקודם אל תיקיית ברירת המחדל של Nginx
COPY --from=build /app/build /usr/share/nginx/html

# (אופציונלי) מעתיקים קובץ קונפיגורציה מותאם אישית ל-Nginx אם יש כזה
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]