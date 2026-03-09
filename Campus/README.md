Campus Info Hub — README
1. Ce este o resursă (resource) în aplicația mea?
O resursă este orice element din aplicație care poate fi accesat printr-un URI. În aplicația Campus Info Hub, resursele sunt paginile HTML ale site-ului (de exemplu index.html, library.html, cafeteria.html, events.html), dar și fișierul resources.json care conține datele despre resursele din campus. De asemenea, anumite secțiuni din pagini pot fi considerate resurse atunci când sunt accesate prin fragmente (ex: #schedule).
2. Exemplu de URI și explicația componentelor
Exemplu de URI:
https://www.google.com/maps
•	https – protocolul de comunicare
•	www.google.com – adresa serverului (host)
•	/maps – calea către resursa de pe server
Un exemplu din aplicația mea este:
/pages/library.html#schedule
•	/pages/library.html – calea către pagina HTML
•	#schedule – fragmentul care indică o secțiune din pagină
3. Care părți sunt statice și care sunt dinamice?
Părțile statice sunt paginile HTML (library.html, cafeteria.html, events.html), fișierul style.css și resources.json, deoarece conținutul lor este definit în cod.
Partea dinamică este secțiunea de resurse din index.html. Acolo JavaScript încarcă datele din resources.json folosind fetch() și generează elementele în pagină. Utilizatorul poate filtra resursele fără să reîncarce pagina.
4. Este aplicația document-centric sau interactivă?
Aplicația este o combinație între document-centric și interactivă. Paginile cu informații despre bibliotecă, cantină sau evenimente sunt document-centrice deoarece afișează conținut static. În schimb, pagina principală este interactivă deoarece permite filtrarea resurselor și actualizarea conținutului dinamic cu ajutorul JavaScript.

