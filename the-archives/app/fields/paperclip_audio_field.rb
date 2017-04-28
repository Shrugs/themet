require "administrate/field/base"

class PaperclipAudioField < Administrate::Field::Base
  def url
    data.url
  end

  def to_s
    data
  end
end

require "administrate/field/base"
