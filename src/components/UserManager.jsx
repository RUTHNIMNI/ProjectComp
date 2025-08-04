import React, { useState } from "react"; // מייבא את React ואת useState
import UserForm from "./UserForm"; // מייבא את קומפוננטת הטופס
import UserList from "./UserList"; // מייבא את קומפוננטת הרשימה

function UserManager() { // קומפוננטת האב שמנהלת את כל הלוגיקה
    const [users, setUsers] = useState([]); // יוצר state בשם users ואת setUsers, ערך התחלתי מערך ריק- כאן נשמור את כל השמות

    const addUser = (name) => setUsers([...users, name]); // פונקציה שמוסיפה שם חדש למערך המשתמשים
    const removeUser = (name) => setUsers(users.filter(user => user !== name)); // פונקציה שמסירה שם מהמערך

    return (
        <div>
            <h1>ניהול משתמשים</h1> {/* כותרת */}
            <UserForm addUser={addUser} /> {/* טופס להוספת משתמש, שולח את addUser כ-prop */}
            <div>
                <strong>מספר משתמשים: {users.length}</strong> {/* מציג את מספר המשתמשים */}
            </div>
            <UserList users={users} removeUser={removeUser} /> {/* מציג את רשימת המשתמשים, שולח את הרשימה ואת פונקציית ההסרה */}
        </div>
    );
}

export default UserManager; // ייצוא הקומפוננטה לשימוש בקובץ אחר


