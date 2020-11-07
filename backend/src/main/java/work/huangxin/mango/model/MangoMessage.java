package work.huangxin.mango.model;

import java.util.Date;
import java.util.List;
import javax.persistence.*;

@Table(name = "`mango_message`")
public class MangoMessage {

    @Override
    public String toString() {
        return "MangoMessage{" +
                "resultImage=" + resultImage +
                ", messageId=" + messageId +
                ", userIdAnonymity=" + userIdAnonymity +
                ", userId=" + userId +
                ", categoryId=" + categoryId +
                ", messageDetail='" + messageDetail + '\'' +
                ", messageShare=" + messageShare +
                ", messageComment=" + messageComment +
                ", messageWatch=" + messageWatch +
                ", messageCreatTime=" + messageCreatTime +
                ", messageImages=" + messageImages +
                ", comments=" + comments +
                ", mangoUser=" + mangoUser +
                ", userProvince=" + userProvince +
                ", userCity=" + userCity +
                ", userDistrict=" + userDistrict +
                ", userCommunity=" + userCommunity +
                ", userLongitude=" + userLongitude +
                ", userLatitude=" + userLatitude +
                '}';
    }

    private List<String> resultImage;

    public List<String> getResultImage() {
        return resultImage;
    }

    public void setResultImage(List<String> resultImage) {
        this.resultImage = resultImage;
    }

    @Id
    @Column(name = "`message_id`")
    private Integer messageId;

    @Column(name = "`user_id_anonymity`")
    private Integer userIdAnonymity;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`category_id`")
    private Integer categoryId;

    @Column(name = "`user_province`")
    private String userProvince;

    @Column(name = "`user_city`")
    private String userCity;

    @Column(name = "`user_district`")
    private String userDistrict;

    @Column(name = "`user_community`")
    private String userCommunity;

    @Column(name = "`user_longitude`")
    private Double userLongitude;

    @Column(name = "`user_latitude`")
    private Double userLatitude;

    @Column(name = "`message_detail`")
    private String messageDetail;

    @Column(name = "`message_share`")
    private Integer messageShare;

    @Column(name = "`message_comment`")
    private Integer messageComment;

    @Column(name = "`message_watch`")
    private Integer messageWatch;

    @Column(name = "`message_creat_time`")
    private Date messageCreatTime;

    private List<MangoMessageImages> messageImages;

    private List<MangoComment> comments;

    private MangoUser mangoUser;

    public MangoUser getMangoUser() {
        return mangoUser;
    }

    public void setMangoUser(MangoUser mangoUser) {
        this.mangoUser = mangoUser;
    }

    public List<MangoMessageImages> getMessageImages() {
        return messageImages;
    }

    public void setMessageImages(List<MangoMessageImages> messageImages) {
        this.messageImages = messageImages;
    }

    public List<MangoComment> getComments() {
        return comments;
    }

    public void setComments(List<MangoComment> comments) {
        this.comments = comments;
    }


    /**
     * @return message_id
     */
    public Integer getMessageId() {
        return messageId;
    }

    /**
     * @param messageId
     */
    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    /**
     * @return user_id_anonymity
     */
    public Integer getUserIdAnonymity() {
        return userIdAnonymity;
    }

    /**
     * @param userIdAnonymity
     */
    public void setUserIdAnonymity(Integer userIdAnonymity) {
        this.userIdAnonymity = userIdAnonymity;
    }
    /**
     * @return userProvince
     */
    public String getUserProvince() {
        return userProvince;
    }

    /**
     * @param userProvince
     */
    public void setUserProvince(String userProvince) {
        this.userProvince = userProvince;
    }

    /**
     * @return userCity
     */
    public String getUserCity() {
        return userCity;
    }

    /**
     * @param userCity
     */
    public void setUserCity(String userCity) {
        this.userCity = userCity;
    }

    /**
     * @return userDistrict
     */
    public String getUserDistrict() {
        return userDistrict;
    }

    /**
     * @param userDistrict
     */
    public void setUserDistrict(String userDistrict) {
        this.userDistrict = userDistrict;
    }

    /**
     * @return userCommunity
     */
    public String getUserCommunity() {
        return userCommunity;
    }

    /**
     * @param userCommunity
     */
    public void setUserCommunity(String userCommunity) {
        this.userCommunity = userCommunity;
    }

    /** @return userLongitude */
    public Double getUserLongitude() {
        return userLongitude;
    }
    /**
     * @param userLongitude
     */
    public void setUserLongitude(Double userLongitude) {
        this.userLongitude = userLongitude;
    }
    /**
     * @return userLatitude
     */
    public Double getUserLatitude() {
        return userLatitude;
    }
    /**
     * @param userLatitude
     */
    public void setUserLatitude(Double userLatitude) {
        this.userLatitude = userLatitude;
    }

    /**
     * @return user_id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * @return category_id
     */
    public Integer getCategoryId() {
        return categoryId;
    }

    /**
     * @param categoryId
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * @return message_detail
     */
    public String getMessageDetail() {
        return messageDetail;
    }

    /**
     * @param messageDetail
     */
    public void setMessageDetail(String messageDetail) {
        this.messageDetail = messageDetail;
    }

    /**
     * @return message_share
     */
    public Integer getMessageShare() {
        return messageShare;
    }

    /**
     * @param messageShare
     */
    public void setMessageShare(Integer messageShare) {
        this.messageShare = messageShare;
    }

    /**
     * @return message_comment
     */
    public Integer getMessageComment() {
        return messageComment;
    }

    /**
     * @param messageComment
     */
    public void setMessageComment(Integer messageComment) {
        this.messageComment = messageComment;
    }

    /**
     * @return message_watch
     */
    public Integer getMessageWatch() {
        return messageWatch;
    }

    /**
     * @param messageWatch
     */
    public void setMessageWatch(Integer messageWatch) {
        this.messageWatch = messageWatch;
    }

    /**
     * @return message_creat_time
     */
    public Date getMessageCreatTime() {
        return messageCreatTime;
    }

    /**
     * @param messageCreatTime
     */
    public void setMessageCreatTime(Date messageCreatTime) {
        this.messageCreatTime = messageCreatTime;
    }
}