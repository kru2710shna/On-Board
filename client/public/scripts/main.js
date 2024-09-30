// public/scripts/main.js
document.addEventListener('DOMContentLoaded', function () {
    console.log('Job Portal JS is loaded!');
  
    const members = document.querySelectorAll('.member');
    members.forEach(member => {
      member.addEventListener('click', function () {
        alert(`You clicked on ${this.textContent}`);
      });
    });
  });
  