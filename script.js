{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Bounce the DogeKnight logo on click\
document.getElementById('doge-logo').addEventListener('click', function() \{\
    this.style.transform = 'scale(1.2)'; // Grow slightly\
    setTimeout(() => \{\
        this.style.transform = 'scale(1)'; // Back to normal\
    \}, 300); // 0.3s bounce\
\});\
\
// Optional: Log a knightly greeting to the console\
console.log("By the Woof of Doge, the realm salutes thee!");}