// get single menu item
// const singleMenuItem = async (req, res) => {
//     const menuId = req.params.id;
//     try {
//         const menu = await Menu.findById(menuId);
//         res.status(200).json(menu)
        
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // update single menu item
// const updateMenuItem = async (req, res) => {
//     const menuId = req.params.id;
//     const { name, recipe, image, category, price} = req.body;
//     try {
//         const updatedMenu = await Menu.findByIdAndUpdate(menuId, 
//             { name, recipe, image, category, price}, 
//             {new: true, runValidator: true}
//             );

//         if(!updatedMenu) {
//             return res.status(404).json({ message:"Menu not found"})
//         }

//         res.status(200).json(updatedMenu)
        
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };