import Foundation

let formatter = DateFormatter()
formatter.dateFormat = "dd/MM/YYYY"
print("Swift says, Hello ASL!")
print(formatter.string(from: Date()))