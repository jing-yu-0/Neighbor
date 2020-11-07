package work.huangxin.mango.util.Upload;

import work.huangxin.mango.model.MangoShop;
import work.huangxin.mango.model.MangoShopImages;
import work.huangxin.mango.model.MangoUser;
import work.huangxin.mango.service.MangoShopService;
import work.huangxin.mango.service.MangoShopImagesService;
import work.huangxin.mango.service.MangoUserService;

import java.util.List;

public class IsShopUpload {

    /**
     * 500 服务器错误
     * 200 上传成功
     * 403 不允许发布,拉黑
     * 400 数据出现问题
     * 401  未登录
     * 1000 非法入侵
     */
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }


    public IsShopUpload isTrue(MangoShop mangoShop, MangoShopService mangoShopService, MangoShopImagesService mangoShopImagesService, MangoUserService mangoUserService) {
        IsShopUpload isUpload = new IsShopUpload();

        MangoUser user = mangoUserService.getById(mangoShop.getUserId());

        if (user == null) {
            isUpload.setCode(1000);
            return isUpload;
        }

        if(user.getUserAllow()!=1){
            isUpload.setCode(301);
            return isUpload;
        }

        List<String> resultImage = mangoShop.getResultImage();

        mangoShopService.insertShopDetail(mangoShop);
        if (resultImage!=null){
            for (int i = 0; i < resultImage.size(); i++) {
                MangoShopImages mangoShopImages = new MangoShopImages();
                mangoShopImages.setShopImages(resultImage.get(i));
                mangoShopImages.setShopId(mangoShop.getShopId());
                mangoShopImagesService.add(mangoShopImages);
            }
        }


        isUpload.setCode(200);

        return isUpload;


    }

}
