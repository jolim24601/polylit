require 'rails_helper'


describe Story do

  context '::top_stories' do
    stories = FactoryGirl.create_list(:published_story, 10)
    top_stories = Story.top_stories(1)

    it 'returns stories in order of most favorited' do
      expect(top_stories[0].favorites_count).to be > top_stories[1].favorites_count
    end
  end

  subject { FactoryGirl.build(:story) }

  context 'validations' do
    it { should validate_length_of(:title) }
    it { should validate_length_of(:subtitle) }
    it { should validate_presence_of(:node) }
    it { should validate_presence_of(:author_id) }
    it { should validate_presence_of(:wordcount) }
  end

  context 'associations' do
    it { should have_many(:favorites).dependent(:destroy) }
    it { should have_many(:bookmarks).dependent(:destroy) }
    it { should have_many(:tags) }
    it { should have_many(:taggings).dependent(:destroy) }
    it { should belong_to(:author) }
  end
end
