package work.huangxin.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import work.huangxin.mango.model.MangoShop;
import work.huangxin.mango.service.MangoShopService;
import work.huangxin.mango.service.MangoShopImagesService;
import work.huangxin.mango.service.MangoUserService;
import work.huangxin.mango.util.Upload.IsShopUpload;


@RestController
public class AddShopDetailController {
    @Autowired
    private MangoShopImagesService mangoShopImagesService;
    @Autowired
    private MangoShopService mangoShopDetailService;
    @Autowired
    private MangoUserService mangoUserService;

    @Transactional
    @PostMapping("/addShop/{userId}")
    public IsShopUpload addShop(@PathVariable Integer userId, @RequestBody MangoShop mangoShop) {
        return new IsShopUpload().isTrue(mangoShop, mangoShopDetailService, mangoShopImagesService, mangoUserService);
    }
}
