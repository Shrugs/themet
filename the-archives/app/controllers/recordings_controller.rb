class RecordingsController < ApplicationController

  def index
    recordings = Recording.all

    recordings = recordings.map { |r|
      {
        id: r.num,
        image: r.image.url,
        image_banner: r.image.url(:banner),
        narrarator: r.narrarator,
        author: r.author,
        title: r.title,
        transcript: r.transcript,
        audio: r.audio.url,
        popular: r.popular
      }
    }

    render json: recordings
  end

end
