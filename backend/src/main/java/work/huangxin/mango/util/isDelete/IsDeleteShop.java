package work.huangxin.mango.util.isDelete;

import com.aliyun.oss.OSSClient;
import work.huangxin.mango.model.*;
import work.huangxin.mango.otherMethod.DeleteAliyunFile;
import work.huangxin.mango.service.*;

import java.util.List;

public class IsDeleteShop {


    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    /**
     * 500 服务器错误
     * 200 上传成功
     * 403 不允许发布,拉黑
     * 400 数据出现问题
     * 401  未登录
     * 1000 非法入侵
     */
    public IsDeleteShop isDelete(Integer userId, Integer ShopId, MangoShopImagesService mangoShopImagesService, MangoUserService mangoUserService, MangoShopService mangoShopService) {
        IsDeleteShop isDelete = new IsDeleteShop();
        isDelete.setCode(500);

        MangoUser user = mangoUserService.getById(userId);

        if (user == null) {
            isDelete.setCode(1000);
            return isDelete;
        }

        MangoShop Shop = mangoShopService.getById(ShopId);

        if (user.getUserIsAdmin() == 2 || Shop.getUserId() == user.getUserId()) {

            mangoShopService.deleteById(ShopId);
            MangoShopImages mangoShopImages = new MangoShopImages();
            mangoShopImages.setShopId(ShopId);
            List<MangoShopImages> images = mangoShopImagesService.findList(mangoShopImages);
            mangoShopImagesService.delete(mangoShopImages);

            // Endpoint以杭州为例，其它Region请按实际情况填写。
            String endpoint = "oss-cn-chengdu.aliyuncs.com";
            // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
            String accessKeyId = "";
            String accessKeySecret = "";
            String bucketName = "";


            // 创建OSSClient实例。
            OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
            DeleteAliyunFile deleteAliyunFile = new DeleteAliyunFile();

            for (int i = 0; i < images.size(); i++) {
                String objectName = images.get(i).getShopImages();
                deleteAliyunFile.DeleteAliyunFile(objectName, ossClient, bucketName);
            }

            // 关闭OSSClient。
//            ossClient.shutdown();

            isDelete.setCode(200);
        }
        return isDelete;
    }
}
