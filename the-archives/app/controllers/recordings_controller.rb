class RecordingsController < ApplicationController

  def index
    recordings = Recording.all

    recordings = recordings.map { |r|
      {
        id: r.num,
        image: r.image.url,
        narrarator: r.narrarator,
        author: r.author,
        title: r.title,
        transcript: r.transcript,
        audio: r.audio.url
      }
    }

    render json: recordings
  end

end
