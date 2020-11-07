package work.huangxin.mango.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "`mango_user`")
public class MangoUser {
    @Id
    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`user_openid`")
    private String userOpenid;

    @Column(name = "`user_gender`")
    private Integer userGender;

    @Column(name = "`user_avatar`")
    private String userAvatar;

    @Column(name = "`user_nickname`")
    private String userNickname;

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

    @Column(name = "`user_is_admin`")
    private Integer userIsAdmin;

    @Column(name = "`user_allow`")
    private Integer userAllow;

    @Column(name = "`user_creat_time`")
    private Date userCreatTime;

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
     * @return user_openid
     */
    public String getUserOpenid() {
        return userOpenid;
    }

    /**
     * @param userOpenid
     */
    public void setUserOpenid(String userOpenid) {
        this.userOpenid = userOpenid;
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
     * @return user_gender
     */
    public Integer getUserGender() {
        return userGender;
    }

    /**
     * @param userGender
     */
    public void setUserGender(Integer userGender) {
        this.userGender = userGender;
    }

    /**
     * @return user_avatar
     */
    public String getUserAvatar() {
        return userAvatar;
    }

    /**
     * @param userAvatar
     */
    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    /**
     * @return user_nickname
     */
    public String getUserNickname() {
        return userNickname;
    }

    /**
     * @param userNickname
     */
    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    /**
     * @return user_is_admin
     */
    public Integer getUserIsAdmin() {
        return userIsAdmin;
    }

    /**
     * @param userIsAdmin
     */
    public void setUserIsAdmin(Integer userIsAdmin) {
        this.userIsAdmin = userIsAdmin;
    }

    /**
     * @return user_allow
     */
    public Integer getUserAllow() {
        return userAllow;
    }

    /**
     * @param userAllow
     */
    public void setUserAllow(Integer userAllow) {
        this.userAllow = userAllow;
    }

    /**
     * @return user_creat_time
     */
    public Date getUserCreatTime() {
        return userCreatTime;
    }

    /**
     * @param userCreatTime
     */
    public void setUserCreatTime(Date userCreatTime) {
        this.userCreatTime = userCreatTime;
    }
}