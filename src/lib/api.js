// https://themet.herokuapp.com/recordings

export async function getTracks () {
  // @TODO(shrugs) throw cloudflare in front of heroku, cache every 30 minutes, only one pending request
  // then call it a day

  return {
    '223': {
      id: '223',
      image: 'https://placekitten.com/300/400',
      narrarator: 'Alex Cohen',
      author: 'Matt Condon',
      title: 'Some Museum Thing',
      transcript: 'Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.',
      audio: 'https://archive.org/download/brennanworldwide5sec/Podzim_You_Suck_Muzak.mp3',
    },
    '222': {
      id: '222',
      image: 'https://placekitten.com/300/400',
      narrarator: 'Alex Cohen',
      author: 'Matt Condon',
      title: 'Some Museum Thing',
      transcript: 'Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.',
      audio: 'https://archive.org/download/brennanworldwide5sec/Podzim_You_Suck_Muzak.mp3',
    },
  }
}
