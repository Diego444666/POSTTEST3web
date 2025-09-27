document.addEventListener("DOMContentLoaded", function() {

    const recommendationForm = document.getElementById("recommendationForm");
    const resultsContainer = document.getElementById("resultsContainer");

    const songDatabase = {
        pop: {
            happy: [{ title: "Happy", artist: "Pharrell Williams", imageSrc: "img_pop_happy.png", audioSrc: "aud_pop_happy.mp3" }],
            sad: [{ title: "Someone Like You", artist: "Adele", imageSrc: "img_pop_sad.png", audioSrc: "aud_pop_sad.mp3" }],
            energetic: [{ title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", imageSrc: "img_pop_energetic.png", audioSrc: "aud_pop_energetic.mp3" }],
            calm: [{ title: "Perfect", artist: "Ed Sheeran", imageSrc: "img_pop_calm.png", audioSrc: "aud_pop_calm.mp3" }]
        },
        rock: {
            happy: [{ title: "Don't Stop Me Now", artist: "Queen", imageSrc: "img_rock_happy.png", audioSrc: "aud_rock_happy.mp3" }],
            sad: [{ title: "Mama, I'm Coming Home", artist: "Ozzy Osbourne", imageSrc: "img_rock_sad.png", audioSrc: "aud_rock_sad.mp3" }],
            energetic: [{ title: "Smells Like Teen Spirit", artist: "Nirvana", imageSrc: "img_rock_energetic.png", audioSrc: "aud_rock_energetic.mp3" }],
            calm: [{ title: "Stairway to Heaven", artist: "Led Zeppelin", imageSrc: "img_rock_calm.png", audioSrc: "aud_rock_calm.mp3" }]
        },
        jazz: {
            happy: [{ title: "What A Wonderful World", artist: "Louis Armstrong", imageSrc: "img_jazz_happy.png", audioSrc: "aud_jazz_happy.mp3" }],
            sad: [{ title: "Strange Fruit", artist: "Billie Holiday", imageSrc: "img_jazz_sad.png", audioSrc: "aud_jazz_sad.mp3" }],
            energetic: [{ title: "Sing, Sing, Sing", artist: "Benny Goodman", imageSrc: "img_jazz_energetic.png", audioSrc: "aud_jazz_energetic.mp3" }],
            calm: [{ title: "So What", artist: "Miles Davis", imageSrc: "img_jazz_calm.png", audioSrc: "aud_jazz_calm.mp3" }]
        },
        edm: {
            happy: [{ title: "Let Me Love You", artist: "DJ Snake ft. Justin Bieber", imageSrc: "img_edm_happy.png", audioSrc: "aud_edm_happy.mp3" }],
            sad: [{ title: "Silence", artist: "Marshmello ft. Khalid", imageSrc: "img_edm_sad.png", audioSrc: "aud_edm_sad.mp3" }],
            energetic: [{ title: "Wake Me Up", artist: "Avicii", imageSrc: "img_edm_energetic.png", audioSrc: "aud_edm_energetic.mp3" }],
            calm: [{ title: "Faded", artist: "Alan Walker", imageSrc: "img_edm_calm.png", audioSrc: "aud_edm_calm.mp3" }]
        }
    };

    recommendationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const selectedGenre = document.querySelector('input[name="genre"]:checked');
        const selectedMood = document.querySelector('input[name="mood"]:checked');

        resultsContainer.innerHTML = '';

        if (selectedGenre && selectedMood) {
            const genre = selectedGenre.value;
            const mood = selectedMood.value;
            
            const recommendations = getRecommendations(genre, mood);
            
            displayRecommendations(recommendations);
        } else {
            const newElement = document.createElement("p");
            newElement.textContent = "Silakan pilih genre dan mood terlebih dahulu.";
            resultsContainer.appendChild(newElement);
        }
    });

    function getRecommendations(genre, mood) {
        return songDatabase[genre][mood] || [{ title: "Maaf, tidak ada lagu yang cocok", artist: "Coba kombinasi lain" }];
    }

    function displayRecommendations(songs) {
        songs.forEach(song => {
            const card = document.createElement("article");
            card.className = "card";

            const image = document.createElement("img");
            image.src = song.imageSrc;
            image.alt = "Album cover for " + song.title;
            image.className = "card-image";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h3");
            title.textContent = song.title;

            const artist = document.createElement("p");
            artist.textContent = `Genre: ${document.querySelector('input[name="genre"]:checked').value} | Mood: ${document.querySelector('input[name="mood"]:checked').value}`;

            const figure = document.createElement("figure");
            const audio = document.createElement("audio");
            audio.controls = true;
            const source = document.createElement("source");
            source.src = song.audioSrc;
            source.type = "audio/mpeg";
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = `${song.title} - ${song.artist}`;

            audio.appendChild(source);
            figure.appendChild(audio);
            figure.appendChild(figcaption);
            
            cardBody.appendChild(title);
            cardBody.appendChild(artist);
            cardBody.appendChild(figure);

            card.appendChild(image);
            card.appendChild(cardBody);

            resultsContainer.appendChild(card);
        });
    }

    const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "☀️";
        } else {
            darkModeToggle.textContent = "🌙";
        }
    });
});