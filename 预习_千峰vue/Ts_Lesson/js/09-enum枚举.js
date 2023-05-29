var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wen"] = 3] = "Wen";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sta"] = 6] = "Sta";
})(Days || (Days = {}));
console.log(Days['Wen']);
console.log(Days[5]);
export default {};
