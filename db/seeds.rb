lily = User.create!(email: 'lily', password: 'password')
frankie = User.create!(email: 'frankie', password: 'password')

lily_board_1 = lily.boards.create!(title: "lily's first board")
ll1 = lily_board_1.lists.create!(title: "first list", ord: 1)
ll1.cards.create!(title: "first card", description: "card stuff", ord: 1)
ll1.cards.create!(title: "second card", description: "more card stuff", ord: 2)
ll1.cards.create!(title: "third card", description: "even more card stuff", ord: 3)

lily_board_1.lists.create!(title: "second list", ord: 2)
lily_board_1.lists.create!(title: "third list", ord: 3)

lily_board_2 = lily.boards.create!(title: "lily's second board")
lily_board_3 = lily.boards.create!(title: "lily's third board")

frankie_board_1 = frankie.boards.create!(title: "frankie's first board")
frankie_board_2 = frankie.boards.create!(title: "frankie's second board")
frankie_board_3 = frankie.boards.create!(title: "frankie's third board")
