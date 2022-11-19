require 'faker';
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts 'user'
User.create(username: 'test123', email: 'test123@email.com', password: '123')
puts 'posts..'

5.times do
    Post.create(
        user_id: 1,
        title: Faker::Lorem.sentence,
        body: Faker::Lorem.paragraph(sentence_count: 20),
        posted_at: DateTime.new(2022,11,rand(1..6),rand(1..19),rand(1.60))
    )
end