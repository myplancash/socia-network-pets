// This module exports fake data fetching functionality.
// In a real app, this would grab data from the internet, but
// this module just waits a little bit before responding.
//
// You don't need to look at this, but you can if you want!

const FAKE_USER_DATA = {
  cat: {
    name: 'Kitty Cat',
    bio: "I'm the coolest cat around. I'm the cat's meow!",
    profilePictureUrl: 'https://content.codecademy.com/courses/React/react_lifecycle_cat_profile_picture.jpg',
    friends: ['komodo', 'jaguar'],
  },
  dog: {
    name: 'Doggy Dog',
    bio: "I'm the doggity dog! Woof woof!",
    profilePictureUrl: 'https://content.codecademy.com/courses/React/react_lifecycle_dog_profile_picture.jpg',
    friends: ['komodo', 'jaguar'],
  },
  komodo: {
    name: 'Lizard Lady',
    bio: "I'm a Komodo dragon. You'll love me.",
    profilePictureUrl: 'https://content.codecademy.com/courses/React/react_lifecycle_komodo_profile_picture.jpg',
    friends: ['cat', 'dog', 'jaguar'],
  },
  jaguar: {
    name: 'Shy and watchful',
    bio: "I'm a Jaguar cat. be careful with my big heart.",
    profilePictureUrl: 'https://i.ibb.co/v3QnMvQ/jaguar.jpg',
    friends: ['komodo', 'chicken', 'arachnids', 'dog'],
  },
  chicken: {
    name: 'Fearless agle',
    bio: "I'm a Chicken-chick!. You wouldn't find a better",
    profilePictureUrl: 'https://i.ibb.co/Vqgf0dt/chicken.jpg',
    friends: ['komodo', 'dog', 'arachnids', 'jaguar'],
  },
  arachnids: {
    name: 'Timid and docile',
    bio: "I'm a Wolf Spider. always climbing to my goals",
    profilePictureUrl: 'https://i.ibb.co/VmmPgrT/arachnids.jpg',
    friends: ['cat', 'dog', 'jaguar'],
  }
};

const timeoutByFetchId = new Map();

class Fetch {
  constructor() {
    Object.defineProperty(this, '_id', {
      value: Date.now() + Math.random().toString().substr(2),
    });
  }
}

export function fetchUserData(username, callback) {
  if (!FAKE_USER_DATA.hasOwnProperty(username)) {
    throw new Error(
      'Invalid username. Make sure it is "cat", "dog", "komodo", "jaguar", "chicken" or "arachnids".'
    );
  }

  const fetch = new Fetch();

  const delay = Math.floor(Math.random() * 1000) + 500;
  const timeout = setTimeout(() => {
    timeoutByFetchId.delete(fetch._id);
    callback(FAKE_USER_DATA[username]);
  }, delay);

  timeoutByFetchId.set(fetch._id, timeout);

  return fetch;
}

export function cancelFetch(fetch) {
  if (!fetch || typeof fetch !== 'object') {
    return;
  }
  const timeout = timeoutByFetchId.get(fetch._id);
  clearTimeout(timeout);
  timeoutByFetchId.delete(fetch._id);
}