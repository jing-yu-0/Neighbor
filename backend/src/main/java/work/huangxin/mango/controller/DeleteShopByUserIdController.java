package work.huangxin.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import work.huangxin.mango.service.*;
import work.huangxin.mango.util.isDelete.IsDelete;
import work.huangxin.mango.util.isDelete.IsDeleteShop;

@RestController
public class DeleteShopByUserIdController {
    @Autowired
    private MangoShopService mangoShopService;
    @Autowired
    private MangoShopImagesService mangoShopImagesService;
    @Autowired
    private MangoUserService mangoUserService;
    @Autowired
    private MangoCollectService mangoCollectService;


    @Transactional
    @PostMapping("/deleteShopById/{userId}/{ShopId}")
    public IsDeleteShop deleteByUserId(@PathVariable Integer userId, @PathVariable Integer ShopId) {
        return new IsDeleteShop().isDelete(userId, ShopId, mangoShopImagesService, mangoUserService, mangoShopService);
    }


}
