package model;

public class ResearcherModel {

	String id;
	String name;
	String phonE;
	String university;

	public ResearcherModel(String id, String name, String phonE, String university) {
		super();
		this.id = id;
		this.name = name;
		this.phonE = phonE;
		this.university = university;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhonE() {
		return phonE;
	}

	public void setPhonE(String phonE) {
		this.phonE = phonE;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	@Override
	public String toString() {
		return "ResearcherModel [id=" + id + ", name=" + name + ", phonE=" + phonE + ", university=" + university + "]";
	}

}
