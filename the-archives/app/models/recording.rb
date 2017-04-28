class Recording < ApplicationRecord
  has_attached_file :image,
    styles: {
      large: '1200x1000^'
    },
    default_url: '/images/:style/missing.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :audio, default_url: ''
  validates_attachment_content_type :audio, content_type: /\Aaudio\/mp3\z/

end
